"use strict";

const JSON5 = require( "json5" );
const utils = require( "eslint-plugin-vue/lib/utils" );

const quoteName = {
    '"': "double quotes",
    "'": "single quotes",
};

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

        return utils.defineTemplateBodyVisitor( context,
            {
                "VAttribute[value!=null]" ( node ) {
                    if ( hasInvalidEOF ) {
                        return;
                    }

                    const text = sourceCode.getText( node.value );
                    const firstChar = text[0];

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
                                newQuote = "'";

                                dequoted = json;
                            }
                        }
                        finally {
                            //
                        }
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
                    hasInvalidEOF = utils.hasInvalidEOF( node );
                },
            } );
    },
};
