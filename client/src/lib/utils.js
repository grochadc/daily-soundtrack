function timeDiff(then){
  let now = new Date().getTime()

  let timeDiff = now - then
  let Seconds = (timeDiff/1000);

  if(Seconds>31540000) {
      return [Math.floor(Seconds/31540000), 'year']
    } else if(Seconds>2628000) {
      return [Math.floor(Seconds/2628000), 'month']
    } else if(Seconds>604800) {
      return [Math.floor(Seconds/604800), 'week']
    } else if(Seconds>86400) {
      return [Math.floor(Seconds/86400), 'day']
    } else if(Seconds>3600){
      return [Math.floor(Seconds/3600), 'hour']
    } else if(Seconds>60){
      return [Math.floor(Seconds/60), 'minute']
    }
  }

export default timeDiff;
