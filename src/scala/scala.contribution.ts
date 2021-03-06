/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { registerLanguage } from '../_.contribution';

registerLanguage({
	id: 'scala',
	extensions: ['.scala'],
	aliases: ['Scala', 'scala'],
	mimetypes: ['text/x-scala-source', 'text/x-scala'],
	loader: () => import('./scala')
});
