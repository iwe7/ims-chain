const qs = require('querystringify')
import { Injectable } from 'ims-common'
@Injectable()
export class QueryString {
    parse(url: string): { [key: string]: any } {
        return qs.parse(url)
    }
    stringify(val: any): string {
        return qs.stringify(val)
    }
}
