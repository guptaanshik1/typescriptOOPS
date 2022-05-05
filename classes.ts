class Department {
    
    // private emps: string[]
    protected emps: string[]
    static fiscalYear = 2022

    // constructor (private id: string, public readonly name: string) {
    constructor (private id: string, public name: string) {
        this.emps = []
    }

    describe (this: Department) {
        console.log(`ID: ${this.id} and Department: ${this.name}`)
    }
}

class IT extends Department {
    constructor (id: string, public admins: string[]) {
        super(id, 'IT')
    }
}

class AccountingDepartment extends Department {
    private static instance: AccountingDepartment
    
    private constructor (id: string, public reports: string[], private lastReport: string) {
        super(id, 'Accounting')
    }

    static getInstance () {
        if (AccountingDepartment.instance) {
            return this.instance
        }
        this.instance = new AccountingDepartment('ID4', [], '')
        return this.instance
    }

    get mostRecentReport () {
        if (this.lastReport) {
            return this.lastReport
        } else {
            return 'Error'
        }
    }

    set mostRecentReport (value) {
        if (value) {
            this.lastReport = value
        } else {
            console.log('Please provide a value')
        }
    }

    createEmployees (emp: string) {
        this.emps.push(emp)
    }
    getEmployees () {
        return this.emps
    }
    createReports (report: string) {
        this.reports.push(report)
        this.lastReport = report
    }
    getReports () {
        return this.reports
    }
}

console.log(Department.fiscalYear) // static

// const accounting = new AccountingDepartment('ID3', [], '')
const accounting = AccountingDepartment.getInstance()
console.log(accounting)

accounting.createEmployees('Emp1')
accounting.createEmployees('Emp2')
accounting.createEmployees('Emp3')
accounting.createEmployees('Emp4')
console.log(accounting.getEmployees())

console.log(accounting.mostRecentReport)
accounting.mostRecentReport = 'Report1'
console.log(accounting.mostRecentReport)


// const accounting = new Department('ID1', [])
// accounting.describe()

const it = new IT('ID2', ['Admin1', 'Admin2', 'Admin3', 'Admin4'])
console.log(it)

// const accountingCopy = { describe: accounting.describe } --> undefined wihout this as parameter
// accountingCopy.describe()

// const accountingCopy = { id: 'ID11', name: 'Dummy', describe: accounting.describe }
// accountingCopy.describe()
