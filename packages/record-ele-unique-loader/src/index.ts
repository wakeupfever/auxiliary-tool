import { getOptions } from 'loader-utils'

export default function (source: any) {
	const options = getOptions()
	console.log(source, 'source')
	console.log(options, 'options');
	return source
}