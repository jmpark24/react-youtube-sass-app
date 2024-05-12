const formatNumber = (num) => num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export default formatNumber;
