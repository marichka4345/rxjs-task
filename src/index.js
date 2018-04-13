import Rx from 'rxjs/Rx';
import * as random from 'random-char';

/** Task 2 **/
function createAwesomeObservable () {
  return Rx.Observable.create(observer => {
    try {
      setInterval(() => {
        observer.next(random('alpha'));
      }, 1000);
    } catch (err) {
      observer.error(err);
    }
  });
}

createAwesomeObservable().take(8).subscribe(
  value => console.log('symbol: ', value),
  error => console.log('Error: ', error)
);

/**  Task 3 **/
const source = Rx.Observable.from('MakE your day wonDerful');
Rx.Observable.prototype.myFilter = function (filterChars) {
  const inputChars = filterChars.toLowerCase()
  return this.filter(char => inputChars.includes(char.toLowerCase()));
};

const filteredSymbols$ = source.myFilter('aouD');

/**  Task 4 **/
Rx.Observable.prototype.switchCase = function () {
  return this.map((char) => {
    return char === char.toLowerCase()
      ? char.toUpperCase()
      : char.toLowerCase();
  });
}

filteredSymbols$.switchCase().subscribe(
  value => console.log('filtered, switch case symbol: ', value)
);

/** Task 5 **/
class AwesomeSubject extends Rx.Subject {
  constructor (skipCount) {
    super();
    this.skipCount = skipCount;
    return this.skip(this.skipCount);
  }
}
const myAwesomeSubject = new AwesomeSubject(2);

myAwesomeSubject.subscribe(v => console.log('Sub1', v));
myAwesomeSubject.next(1);
myAwesomeSubject.next(2);
myAwesomeSubject.next(3); // Sub1 3
myAwesomeSubject.next(4); // Sub1 4
myAwesomeSubject.subscribe(v => console.log('Sub2', v));
myAwesomeSubject.next(5); // Sub1 5
myAwesomeSubject.next(6); // Sub1 6
myAwesomeSubject.next(7); // Sub1 7, Sub2 7
myAwesomeSubject.next(8); // Sub1 8, Sub2 8
