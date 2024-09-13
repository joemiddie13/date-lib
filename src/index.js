class D {
  constructor(...args) {
    this._date = new Date(...args);
  }
}

// Test different instantiation methods
console.log('No parameters:', new D());
console.log('With string:', new D('January 1, 1970'));
console.log('With numbers:', new D(2010, 6, 13, 25, 50));
console.log('With another Date object:', new D(new Date()));

module.exports = D;