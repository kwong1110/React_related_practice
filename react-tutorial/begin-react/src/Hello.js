import React from 'react';

function Hello({ name , isSpecial}) {
    return (
        <div>안녕하세요 {name}
            {isSpecial && <b>*님*</b>}
        </div>
    );
}

Hello.defaultProps = {
  name: '이름없음'
};

export default Hello;