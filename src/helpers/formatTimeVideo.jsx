const formatTimeVideo = (str) => {
  // str format : PT6H10M13S
  if (!str.startsWith('PT')) return null;
  // PT로 시작하는지 검증
  const time = str.substring(2);
  // PT 제거 : 6H10M13S -> 6:01::13:
  let duration = '';

  for (let i = 0; i < time.length; i++) {
    if (!Number(time[i])) {
      // 0이나 텍스트면 ':' 로 바꿈
      duration += ':';
    } else if (i > 0 && !Number(time[i - 1]) && !Number(time[i + 1])) {
      // 0보다 크고 (앞과 뒤가 0 아니면 텍스트)
      duration += '0' + time[i];
    } else {
      duration += time[i];
    }
  }

  if (time.indexOf('H') !== -1 && time.indexOf('M') === -1 && time.endsWith('S')) {
    // h 있고 m 없고 s 있으면 hh:00:ss
    const [hour, min] = duration.slice(0, -1).split(':');
    return `${hour}:00:${min}`;
  } else if (time.endsWith('M')) {
    // m으로 끝나면 mm:00, 초가 없으면과 같음
    return duration + '00';
  } else if (duration.endsWith('::')) {
    // ::으로 끝나면 뒤에 ::빼
    return duration.slice(0, -2);
  } else {
    // :: 들어있으면 :로 바꿔
    const result = duration.replace('::', ':');
    return result.slice(0, -1);
  }
};

export default formatTimeVideo;
