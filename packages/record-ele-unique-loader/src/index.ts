import { getOptions } from 'loader-utils'

export default function (source: any) {
	const options = getOptions()
	return source
}