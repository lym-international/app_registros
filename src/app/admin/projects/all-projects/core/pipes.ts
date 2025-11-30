import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  // text truncation pipe

  transform(value: string, args: any[]): string {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
    const trail = args.length > 1 ? args[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}

@Pipe({
  name: 'pluralize'
})
export class PluralPipe implements PipeTransform {

  // https://typeofweb.com/odmiana-rzeczownikow-przy-liczebnikach-jezyku-polskim/

  transform(
    n: number,
    singularNominativ: string,
    pluralNominativ: string,
    pluralGenitive: string
  ): string {
    if (n === 1) {
       return singularNominativ;
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      return pluralNominativ;
    } else {
      return pluralGenitive;
    }
  }

}
