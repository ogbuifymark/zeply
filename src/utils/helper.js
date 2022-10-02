const  WordEllipse = (str, n, start)=>{
    return (str.length > n) ? str.slice(start, start+n-1) + '...' : str;
  };

  export {WordEllipse}