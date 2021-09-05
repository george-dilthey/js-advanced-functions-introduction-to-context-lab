// Your code here
function createEmployeeRecord(arr){
    const obj =  {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    const employeeRecord = Object.create(obj)
    return employeeRecord
}

function createEmployeeRecords(arr){
    return arr.map((record) => createEmployeeRecord(record))
}

function createTimeInEvent(obj, d){
    const hour = d.split(" ")[1]*1
    const date = d.split(" ")[0]
    const newObj = {
        type: "TimeIn",
        hour: hour,
        date: date
    }
    obj.timeInEvents.push(newObj)
    return obj

}

function createTimeOutEvent(obj, d){
    const hour = d.split(" ")[1]*1
    const date = d.split(" ")[0]
    const newObj = {
        type: "TimeOut",
        hour: hour,
        date: date
    }
    obj.timeOutEvents.push(newObj)
    return obj
}

function hoursWorkedOnDate(obj, date){
    const timeInHour = obj.timeInEvents.find(e => e.date == date).hour
    const timeOutHour = obj.timeOutEvents.find(e => e.date == date).hour
    return timeOutHour/100 - timeInHour/100
}

function wagesEarnedOnDate(obj, date){
    return hoursWorkedOnDate(obj,date) * obj.payPerHour
}

function allWagesFor(obj){
    const dates = obj.timeInEvents.map(d => d.date)
    const allWages = dates.reduce((acc, curr) => acc + wagesEarnedOnDate(obj, curr),0)
    return allWages
}

function findEmployeeByFirstName(arr, name){
    return arr.find(e => e.firstName == name)
}

function calculatePayroll(arr){
    return arr.reduce((arr, curr) => arr + allWagesFor(curr), 0)
}