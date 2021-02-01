"use strict";

const JSON5 = require( "json5" );
const path = require( "path" );

const quoteName = {
    '"': "double quotes",
    "'": "single quotes",
};

function _hasInvalidEOF ( node ) {
    const body = node.templateBody;

    if ( body == null || body.errors == null ) return false;

    return body.errors.some( error => typeof error.code === "string" && error.code.startsWith( "eof-" ) );
}

function _defineTemplateBodyVisitor ( context, templateBodyVisitor, scriptVisitor ) {
    if ( context.parserServices.defineTemplateBodyVisitor == null ) {
        const filename = context.getFilename();

        if ( path.extname( filename ) === ".vue" ) {
            context.report( {
                "loc": { "line": 1, "column": 0 },
                "message": "Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error.",
            } );
        }

        return {};
    }

    return context.parserServices.defineTemplateBodyVisitor( templateBodyVisitor, scriptVisitor );
}

module.exports = {
    "meta": {
        "type": "layout",
        "docs": {
            "description": "enforce quotes style of HTML attributes",
            "category": "recommended",
            "url": "https://bitbucket.org/softvisio/softvisio-eslint-plugin",
        },
        "fixable": "code",
        "schema": [{ "enum": ["auto", "double", "single"] }],
    },

    create ( context ) {
        const sourceCode = context.getSourceCode();

        let hasInvalidEOF;

        return _defineTemplateBodyVisitor( context,
            {
                "VAttribute[value!=null]" ( node ) {
                    if ( hasInvalidEOF ) {
                        return;
                    }

                    const text = sourceCode.getText( node.value ),
                        firstChar = text[0];

                    var quote, dequoted, newQuote;

                    if ( firstChar === "'" || firstChar === '"' ) {
                        quote = firstChar;

                        dequoted = text.slice( 1, -1 );
                    }
                    else {
                        dequoted = text;
                    }

                    // unescape
                    dequoted = dequoted.replace( /&quot;/g, '"' );
                    dequoted = dequoted.replace( /&apos;/g, "'" );

                    if ( dequoted[0] === "{" ) {
                        try {
                            const json = JSON.stringify( JSON5.parse( dequoted ) );

                            if ( dequoted !== json ) {
                                quote = '"';
                                newQuote = "'";

                                dequoted = json;
                            }
                        }
                        catch {}
                    }

                    if ( !newQuote ) {
                        const mode = context.options[0];

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
                            "data": { "kind": quoteName[newQuote] },
                            fix ( fixer ) {
                                let replacement;

                                if ( newQuote === '"' ) {
                                    replacement = '"' + dequoted.replace( /"/g, "&quot;" ) + '"';
                                }
                                else {
                                    replacement = "'" + dequoted.replace( /'/g, "&apos;" ) + "'";
                                }

                                return fixer.replaceText( node.value, replacement );
                            },
                        } );
                    }
                },
            },
            {
                Program ( node ) {
                    hasInvalidEOF = _hasInvalidEOF( node );
                },
            } );
    },
};
