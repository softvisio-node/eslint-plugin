import path from "node:path";
import JSON5 from "json5";

const quoteName = {
    '"': "double quotes",
    "'": "single quotes",
};

function _hasInvalidEof ( node ) {
    const body = node.templateBody;

    if ( body == null || body.errors == null ) return false;

    return body.errors.some( error => typeof error.code === "string" && error.code.startsWith( "eof-" ) );
}

function _defineTemplateBodyVisitor ( context, templateBodyVisitor, scriptVisitor ) {
    const sourceCode = context.getSourceCode();

    if ( sourceCode.parserServices.defineTemplateBodyVisitor == null ) {
        const filename = context.getFilename();

        if ( path.extname( filename ) === ".vue" ) {
            context.report( {
                "loc": { "line": 1, "column": 0 },
                "message": "Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error.",
            } );
        }

        return {};
    }

    return sourceCode.parserServices.defineTemplateBodyVisitor( templateBodyVisitor, scriptVisitor );
}

export default {
    "meta": {
        "type": "layout",
        "fixable": "code",
        "schema": [ { "enum": [ "auto", "double", "single" ] } ],
    },

    create ( context ) {
        const sourceCode = context.getSourceCode();

        let hasInvalidEof;

        return _defineTemplateBodyVisitor(
            context,
            {
                "VAttribute[value!=null]" ( node ) {
                    if ( hasInvalidEof ) {
                        return;
                    }

                    const text = sourceCode.getText( node.value ),
                        firstChar = text[ 0 ];

                    var quote, dequoted, newQuote;

                    if ( firstChar === "'" || firstChar === '"' ) {
                        quote = firstChar;

                        dequoted = text.slice( 1, -1 );
                    }
                    else {
                        dequoted = text;
                    }

                    // unescape
                    dequoted = dequoted.replaceAll( "&quot;", '"' );
                    dequoted = dequoted.replaceAll( "&apos;", "'" );

                    if ( dequoted[ 0 ] === "{" ) {
                        try {
                            const parsed = JSON5.parse( dequoted );

                            const json = JSON.stringify( parsed, sortObject );

                            if ( dequoted !== json ) {
                                quote = '"';
                                newQuote = "'";

                                dequoted = json;
                            }
                        }
                        catch {}
                    }

                    if ( !newQuote ) {
                        const mode = context.options[ 0 ];

                        if ( mode === "double" ) {
                            newQuote = '"';
                        }
                        else if ( mode === "single" ) {
                            newQuote = "'";
                        }
                        else {
                            const countDouble = ( dequoted.match( /"/g ) || [] ).length;
                            const countSingle = ( dequoted.match( /'/g ) || [] ).length;

                            if ( countDouble <= countSingle ) {
                                newQuote = '"';
                            }
                            else {
                                newQuote = "'";
                            }
                        }
                    }

                    if ( quote !== newQuote ) {
                        context.report( {
                            "node": node.value,
                            "loc": node.value.loc,
                            "message": "Expected to be enclosed by {{kind}}.",
                            "data": { "kind": quoteName[ newQuote ] },
                            fix ( fixer ) {
                                let replacement;

                                if ( newQuote === '"' ) {
                                    replacement = '"' + dequoted.replaceAll( '"', "&quot;" ) + '"';
                                }
                                else {
                                    replacement = "'" + dequoted.replaceAll( "'", "&apos;" ) + "'";
                                }

                                return fixer.replaceText( node.value, replacement );
                            },
                        } );
                    }
                },
            },
            {
                Program ( node ) {
                    hasInvalidEof = _hasInvalidEof( node );
                },
            }
        );
    },
};

function objectIsPlain ( object ) {
    return object instanceof Object && object.constructor === Object;
}

function sortObject ( key, value ) {
    if ( objectIsPlain( value ) ) {
        value = Object.keys( value )
            .sort()
            .reduce( ( sorted, key ) => {
                sorted[ key ] = value[ key ];

                return sorted;
            }, {} );
    }

    return value;
}
