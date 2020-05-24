/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import { testTokenization } from '../test/testRunner';

testTokenization('scala', [
	// implicit function with
	[{
		line: 'implicit def foo[T <: Any]()',
		tokens: [
			{ startIndex: 0, type: 'keyword.implicit.scala' },
			{ startIndex: 8, type: '' },
			{ startIndex: 9, type: 'keyword.def.scala' },
			{ startIndex: 12, type: '' },
			{ startIndex: 13, type: 'identifier.scala' },
			{ startIndex: 16, type: 'delimiter.square.scala' },
			{ startIndex: 17, type: 'type.identifier.scala' },
			{ startIndex: 18, type: '' },
			{ startIndex: 22, type: 'type.identifier.scala' },
			{ startIndex: 25, type: 'delimiter.square.scala' },
			{ startIndex: 26, type: 'delimiter.parenthesis.scala' }
		]
	}],

	// Val declaration and assignment
	[{
		line: 'val x = 5',
		tokens: [
			{ startIndex: 0, type: 'keyword.val.scala' },
			{ startIndex: 3, type: '' },
			{ startIndex: 4, type: 'identifier.scala' },
			{ startIndex: 5, type: 'delimiter.scala' },
			{ startIndex: 6, type: '' },
			{ startIndex: 7, type: 'type.identifier.scala' },
			{ startIndex: 8, type: 'delimiter.scala' },
			{ startIndex: 9, type: 'number.scala' },
		]
	}],

	// Comments - single line
	[{
		line: '//',
		tokens: [
			{ startIndex: 0, type: 'comment.scala' }
		]
	}],

	[{
		line: '    // a comment',
		tokens: [
			{ startIndex: 0, type: '' },
			{ startIndex: 4, type: 'comment.scala' }
		]
	}],

	[{
		line: '// a comment',
		tokens: [
			{ startIndex: 0, type: 'comment.scala' }
		]
	}],

	[{
		line: '//sticky comment',
		tokens: [
			{ startIndex: 0, type: 'comment.scala' }
		]
	}],

	[{
		line: '/almost a comment',
		tokens: [
			{ startIndex: 0, type: 'delimiter.scala' },
			{ startIndex: 1, type: 'identifier.scala' },
			{ startIndex: 7, type: '' },
			{ startIndex: 8, type: 'identifier.scala' },
			{ startIndex: 9, type: '' },
			{ startIndex: 10, type: 'identifier.scala' }
		]
	}],

	[{
		line: '1 / 2 // comment',
		tokens: [
			{ startIndex: 0, type: 'number.scala' },
			{ startIndex: 1, type: '' },
			{ startIndex: 2, type: 'delimiter.scala' },
			{ startIndex: 3, type: '' },
			{ startIndex: 4, type: 'number.scala' },
			{ startIndex: 5, type: 'delimiter.scala' },
			{ startIndex: 6, type: '' },
			{ startIndex: 7, type: 'comment.scala' }
		]
	}],

	[{
		line: 'var x = 1 // my comment // is a nice one',
		tokens: [
			{ startIndex: 0, type: 'keyword.var.scala' },
			{ startIndex: 3, type: '' },
			{ startIndex: 4, type: 'identifier.scala' },
			{ startIndex: 5, type: '' },
			{ startIndex: 6, type: 'delimiter.scala' },
			{ startIndex: 7, type: '' },
			{ startIndex: 8, type: 'number.scala' },
			{ startIndex: 9, type: '' },
			{ startIndex: 10, type: 'comment.scala' },
			{ startIndex: 12, type: '' },
			{ startIndex: 13, type: 'comment.scala' }
		]
	}],

	// Comments - range comment, single line
	[{
		line: '/* a simple comment */',
		tokens: [
			{ startIndex: 0, type: 'comment.scala' }
		]
	}],

	[{
		line: 'val x = /* a simple comment */ 1',
		tokens: [
			{ startIndex: 0, type: 'keyword.var.scala' },
			{ startIndex: 3, type: '' },
			{ startIndex: 4, type: 'identifier.scala' },
			{ startIndex: 5, type: '' },
			{ startIndex: 6, type: 'delimiter.scala' },
			{ startIndex: 7, type: '' },
			{ startIndex: 8, type: 'comment.scala' },
			{ startIndex: 30, type: '' },
			{ startIndex: 31, type: 'number.scala' },
		]
	}],

	[{
		line: 'val x = /* comment */ 1; */',
		tokens: [
			{ startIndex: 0, type: 'keyword.var.scala' },
			{ startIndex: 3, type: '' },
			{ startIndex: 4, type: 'identifier.scala' },
			{ startIndex: 5, type: '' },
			{ startIndex: 6, type: 'delimiter.scala' },
			{ startIndex: 7, type: '' },
			{ startIndex: 8, type: 'comment.scala' },
			{ startIndex: 21, type: '' },
			{ startIndex: 22, type: 'number.scala' },
			{ startIndex: 23, type: 'delimiter.scala' },
			{ startIndex: 24, type: '' }
		]
	}],

	[{
		line: 'x = /**/ 5',
		tokens: [
			{ startIndex: 0, type: 'identifier.scala' },
			{ startIndex: 1, type: '' },
			{ startIndex: 2, type: 'delimiter.scala' },
			{ startIndex: 3, type: '' },
			{ startIndex: 4, type: 'comment.scala' },
		]
	}],

	[{
		line: 'var x = /** start a Java Doc comment',
		tokens: [
			{ startIndex: 0, type: 'keyword.var.scala' },
			{ startIndex: 3, type: '' },
			{ startIndex: 4, type: 'identifier.scala' },
			{ startIndex: 5, type: '' },
			{ startIndex: 6, type: 'delimiter.scala' },
			{ startIndex: 7, type: '' },
			{ startIndex: 8, type: 'comment.doc.scala' }
		]
	}, {
		line: ' a ',
		tokens: [
			{ startIndex: 0, type: 'comment.doc.scala' }
		]
	}, {
		line: 'and end it */ 2',
		tokens: [
			{ startIndex: 0, type: 'comment.doc.scala' },
			{ startIndex: 13, type: '' },
			{ startIndex: 14, type: 'number.scala' },
		]
	}],

	[{
		line: '/** start of Java Doc',
		tokens: [
			{ startIndex: 0, type: 'comment.doc.scala' }
		]
	}, {
		line: 'a comment between without a star',
		tokens: [
			{ startIndex: 0, type: 'comment.doc.scala' }
		]
	}, {
		line: 'end of multiline comment*/',
		tokens: [
			{ startIndex: 0, type: 'comment.doc.scala' }
		]
	}],

	// Keywords
	[{
		line: 'public static abstract case class Program(val a: Int, var b: Long, c: String, d: Byte => Short) extends Interface with Trait { fun main(vararg args: String) {} } }',
		tokens: [
			{ startIndex: 0, type: 'keyword.package.scala' },
			{ startIndex: 7, type: '' },
			{ startIndex: 8, type: 'identifier.scala' },
			{ startIndex: 12, type: '' },
			{ startIndex: 13, type: 'keyword.class.scala' },
			{ startIndex: 18, type: '' },
			{ startIndex: 19, type: 'type.identifier.scala' },
			{ startIndex: 26, type: '' },
			{ startIndex: 27, type: 'delimiter.curly.scala' },
			{ startIndex: 28, type: '' },
			{ startIndex: 29, type: 'keyword.fun.scala' },
			{ startIndex: 32, type: '' },
			{ startIndex: 33, type: 'identifier.scala' },
			{ startIndex: 37, type: 'delimiter.parenthesis.scala' },
			{ startIndex: 38, type: 'keyword.vararg.scala' },
			{ startIndex: 44, type: '' },
			{ startIndex: 45, type: 'identifier.scala' },
			{ startIndex: 49, type: 'delimiter.scala' },
			{ startIndex: 50, type: '' },
			{ startIndex: 51, type: 'type.identifier.scala' },
			{ startIndex: 57, type: 'delimiter.parenthesis.scala' },
			{ startIndex: 58, type: '' },
			{ startIndex: 59, type: 'delimiter.curly.scala' },
			{ startIndex: 61, type: '' },
			{ startIndex: 62, type: 'delimiter.curly.scala' },
			{ startIndex: 63, type: '' },
			{ startIndex: 64, type: 'delimiter.curly.scala' }
		]
	}],

	// Numbers
	[{
		line: '0',
		tokens: [
			{ startIndex: 0, type: 'number.scala' }
		]
	}],

	[{
		line: '0.10',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '0x',
		tokens: [
			{ startIndex: 0, type: 'number.scala' },
			{ startIndex: 1, type: 'identifier.scala' }
		]
	}],

	[{
		line: '0x123',
		tokens: [
			{ startIndex: 0, type: 'number.hex.scala' }
		]
	}],

	[{
		line: '0x5_2',
		tokens: [
			{ startIndex: 0, type: 'number.hex.scala' }
		]
	}],

	[{
		line: '023L',
		tokens: [
			{ startIndex: 0, type: 'number.octal.scala' }
		]
	}],

	[{
		line: '0123l',
		tokens: [
			{ startIndex: 0, type: 'number.octal.scala' }
		]
	}],

	[{
		line: '05_2',
		tokens: [
			{ startIndex: 0, type: 'number.octal.scala' }
		]
	}],

	[{
		line: '0b1010_0101',
		tokens: [
			{ startIndex: 0, type: 'number.binary.scala' }
		]
	}],

	[{
		line: '0B001',
		tokens: [
			{ startIndex: 0, type: 'number.binary.scala' }
		]
	}],

	[{
		line: '10e3',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '10f',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '23.5',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '23.5e3',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '23.5e-3',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '23.5E3',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '23.5E-3',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '23.5F',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '23.5f',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '23.5D',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '23.5d',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '1.72E3D',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '1.72E3d',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '1.72E-3d',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '1.72e3D',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '1.72e3d',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '1.72e-3d',
		tokens: [
			{ startIndex: 0, type: 'number.float.scala' }
		]
	}],

	[{
		line: '23L',
		tokens: [
			{ startIndex: 0, type: 'number.scala' }
		]
	}],

	[{
		line: '23l',
		tokens: [
			{ startIndex: 0, type: 'number.scala' }
		]
	}],

	[{
		line: '0_52',
		tokens: [
			{ startIndex: 0, type: 'number.scala' }
		]
	}],

	[{
		line: '5_2',
		tokens: [
			{ startIndex: 0, type: 'number.scala' }
		]
	}],

	[{
		line: '5_______2',
		tokens: [
			{ startIndex: 0, type: 'number.scala' }
		]
	}],

	[{
		line: '3_.1415F',
		tokens: [
			{ startIndex: 0, type: 'number.scala' },
			{ startIndex: 1, type: 'identifier.scala' },
			{ startIndex: 2, type: 'delimiter.scala' },
			{ startIndex: 3, type: 'number.float.scala' }
		]
	}],

	[{
		line: '3._1415F',
		tokens: [
			{ startIndex: 0, type: 'number.scala' },
			{ startIndex: 1, type: 'delimiter.scala' },
			{ startIndex: 2, type: 'identifier.scala' }
		]
	}],

	[{
		line: '999_99_9999_L',
		tokens: [
			{ startIndex: 0, type: 'number.scala' },
			{ startIndex: 11, type: 'identifier.scala' }
		]
	}],

	[{
		line: '52_',
		tokens: [
			{ startIndex: 0, type: 'number.scala' },
			{ startIndex: 2, type: 'identifier.scala' }
		]
	}],

	[{
		line: '0_x52',
		tokens: [
			{ startIndex: 0, type: 'number.scala' },
			{ startIndex: 1, type: 'identifier.scala' }
		]
	}],

	[{
		line: '0x_52',
		tokens: [
			{ startIndex: 0, type: 'number.scala' },
			{ startIndex: 1, type: 'identifier.scala' }
		]
	}],

	[{
		line: '0x52_',
		tokens: [
			{ startIndex: 0, type: 'number.hex.scala' },
			{ startIndex: 4, type: 'identifier.scala' }
		]
	}],

	[{
		line: '052_',
		tokens: [
			{ startIndex: 0, type: 'number.octal.scala' },
			{ startIndex: 3, type: 'identifier.scala' }
		]
	}],

	[{
		line: '0+0',
		tokens: [
			{ startIndex: 0, type: 'number.scala' },
			{ startIndex: 1, type: 'delimiter.scala' },
			{ startIndex: 2, type: 'number.scala' }
		]
	}],

	[{
		line: '100+10',
		tokens: [
			{ startIndex: 0, type: 'number.scala' },
			{ startIndex: 3, type: 'delimiter.scala' },
			{ startIndex: 4, type: 'number.scala' }
		]
	}],

	[{
		line: '0 + 0',
		tokens: [
			{ startIndex: 0, type: 'number.scala' },
			{ startIndex: 1, type: '' },
			{ startIndex: 2, type: 'delimiter.scala' },
			{ startIndex: 3, type: '' },
			{ startIndex: 4, type: 'number.scala' }
		]
	}],

	// single line Strings
	[{
		line: 'var s = "I\'m a Scala String"',
		tokens: [
			{ startIndex: 0, type: 'keyword.var.scala' },
			{ startIndex: 3, type: '' },
			{ startIndex: 4, type: 'identifier.scala' },
			{ startIndex: 5, type: '' },
			{ startIndex: 6, type: 'delimiter.scala' },
			{ startIndex: 7, type: '' },
			{ startIndex: 8, type: 'string.scala' },
		]
	}],

	[{
		line: 'var s = "concatenated" + " String"',
		tokens: [
			{ startIndex: 0, type: 'keyword.var.scala' },
			{ startIndex: 3, type: '' },
			{ startIndex: 4, type: 'identifier.scala' },
			{ startIndex: 5, type: '' },
			{ startIndex: 6, type: 'delimiter.scala' },
			{ startIndex: 7, type: '' },
			{ startIndex: 8, type: 'string.scala' },
			{ startIndex: 22, type: '' },
			{ startIndex: 23, type: 'delimiter.scala' },
			{ startIndex: 24, type: '' },
			{ startIndex: 25, type: 'string.scala' },
		]
	}],

	[{
		line: '"quote in a string"',
		tokens: [
			{ startIndex: 0, type: 'string.scala' }
		]
	}],

	[{
		line: '"escaping \\"quotes\\" is cool"',
		tokens: [
			{ startIndex: 0, type: 'string.scala' },
			{ startIndex: 10, type: 'string.escape.scala' },
			{ startIndex: 12, type: 'string.scala' },
			{ startIndex: 18, type: 'string.escape.scala' },
			{ startIndex: 20, type: 'string.scala' }
		]
	}],

	[{
		line: '"\\"',
		tokens: [
			{ startIndex: 0, type: 'string.invalid.scala' }
		]
	}],

	// Annotations
	[{
		line: '@',
		tokens: [
			{ startIndex: 0, type: '' }
		]
	}],

	[{
		line: '@Inject',
		tokens: [
			{ startIndex: 0, type: 'annotation.scala' }
		]
	}],

	[{
		line: '@SuppressWarnings("aString")',
		tokens: [
			{ startIndex: 0, type: 'annotation.scala' },
			{ startIndex: 17, type: 'delimiter.parenthesis.scala' },
			{ startIndex: 18, type: 'string.scala' },
			{ startIndex: 27, type: 'delimiter.parenthesis.scala' }
		]
	}],

	[{
		line: '@ AnnotationWithKeywordAfter private',
		tokens: [
			{ startIndex: 0, type: 'annotation.scala' },
			{ startIndex: 28, type: '' },
			{ startIndex: 29, type: 'keyword.private.scala' }
		]
	}],

	[{
		line: 'fun /* /* */ */ main() {',
		tokens: [
			{ startIndex: 0, type: 'keyword.fun.scala' },
			{ startIndex: 3, type: '' },
			{ startIndex: 4, type: 'comment.scala' },
			{ startIndex: 15, type: '' },
			{ startIndex: 16, type: 'identifier.scala' },
			{ startIndex: 20, type: 'delimiter.parenthesis.scala' },
			{ startIndex: 22, type: '' },
			{ startIndex: 23, type: 'delimiter.curly.scala' },
		]
	}],

	[{
		line: 'val text = """',
		tokens: [
			{ startIndex: 0, type: 'keyword.val.scala' },
			{ startIndex: 3, type: '' },
			{ startIndex: 4, type: 'identifier.scala' },
			{ startIndex: 8, type: '' },
			{ startIndex: 9, type: 'delimiter.scala' },
			{ startIndex: 10, type: '' },
			{ startIndex: 11, type: 'string.scala' },
		]
	},
	{
		line: '    for (c in "foo")',
		tokens: [
			{ startIndex: 0, type: 'string.scala' },
		]
	},
	{
		line: '        print(c)',
		tokens: [
			{ startIndex: 0, type: 'string.scala' },
		]
	},
	{
		line: '"""',
		tokens: [
			{ startIndex: 0, type: 'string.scala' },
		]
	}],
]);
