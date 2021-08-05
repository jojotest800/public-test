const fs = require('fs')
const { CronJob } = require("cron");
const path = require('path');

module.exports = class Scheduler {
  constructor({ addressService }) {
    this.addressService = addressService;
    this.jobList = []
  }

  setTask(time, task, callback, start, timezone) {
    const job = new CronJob(
      time,
      task,
      (callback = null),
      (start = true),
      (timezone = "America/Los_Angeles")
    );
    job.start();
  }

  tasks() {
    // this.begin("* 1 * * * *", this.addresCounter);
    // this.begin("5 * * * * *", this.makeUpoloadEmpty);
  }

async run(func, name){
  console.log('Started job ', name);
    try {
      const res = await func()
      if(res === 'finished'){
        const index = this.jobList.findIndex(e => e.name === name)
        if(index > -1){
          this.jobList[index].stop()
          this.jobList.splice(index, 1)
        }
      }
    } catch (error) {
      console.log('Error in job ', name, error);
      
    }
    console.log('Job ', name,  ' done successfully');
  }

  begin(time, func){
    const funcName = func.name
    const job = new CronJob(time, this.run.bind(this, func.bind(this), funcName), ()=>{}, true)
    job.name = funcName
    this.jobList.push(job)
  }

  addresCounter(){
    return this.addressService.countAllAddresses()
  }


  makeUpoloadEmpty(){
    const files = fs.readdirSync('uploads')
    if(Array.isArray(files) && files.length > 0){
      files.forEach(file => {
        const fi = path.resolve('uploads/'+file)
        console.log('get the path ', __dirname);
        if(fs.readFileSync(fi)){
          fs.unlink(fi)
        }
        console.log('files uploads list :', files);
      })
    }
  }
};
