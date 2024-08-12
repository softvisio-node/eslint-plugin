const builtinModules = new Set( require( "node:module" ).builtinModules );

module.exports = {
    "meta": {
        "type": "suggestion",
        "fixable": "code",
        "schema": [],
    },
    "create": context => ( {
        ImportDeclaration ( node ) {
            const { source } = node;

            if ( source?.type === "Literal" && typeof source.value === "string" ) {
                const moduleName = source.value;

                if ( builtinModules.has( moduleName ) && !moduleName.startsWith( "node:" ) ) {
                    context.report( {
                        "node": source,
                        "message": `Import of built-in Node.js module "${ moduleName }" must use the "node:" prefix.`,
                        "fix": fixer => fixer.replaceText( source, `"node:${ moduleName }"` ),
                    } );
                }
            }
        },
    } ),
};
