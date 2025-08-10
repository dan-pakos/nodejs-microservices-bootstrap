import globals from 'globals'
import genericConfig from 'eslint-config-generic'

export default [
    ...genericConfig,
    ...[
        {
            languageOptions: {
                globals: {
                    ...globals.node,
                },
            },
        },
    ],
]
