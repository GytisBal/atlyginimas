class Storage {
  constructor(salary) {
    this.salary = salary;
  }
  getValue() {
    if (localStorage.getItem("salary") === null) {
      this.salary = [];
    } else {
      this.salary = JSON.parse(localStorage.getItem("salary"));
    }
    return {
      salary: this.salary
    };
  }
  setValue(salary) {
    localStorage.setItem("salary", JSON.stringify(salary));
  }
}
