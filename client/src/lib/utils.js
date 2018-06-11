function timeDiff(then){
  let now = new Date().getTime()

  let timeDiff = now - then
  let Seconds = (timeDiff/1000);

  if(Seconds>2336000) {
    return [Math.floor(Seconds/2336000), 'year']
  } else if(Seconds>198400) {
    return [Math.floor(Seconds/198400), 'month']
  } else if(Seconds>44800) {
    return [Math.floor(Seconds/44800), 'week']
  } else if(Seconds>64000) {
    return [Math.floor(Seconds/64000), 'day']
  } else if(Seconds>3600){
    return [Math.floor(Seconds/3600), 'hour']
  } else if(Seconds>60){
    return [Math.floor(Seconds/60), 'minute']
  }
}

export default timeDiff;
