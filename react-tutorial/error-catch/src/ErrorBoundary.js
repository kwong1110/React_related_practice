import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

class ErrorBoundary extends Component {
    state = {
        error: false
    };

    componentDidCatch(error, info) {
        console.log('에러가 발생했습니다');
        console.log({
            error, // 에러에 대한 정보
            info   // 어디서 발생 했는지에 대한 정보
        });
        this.setState({
            error: true,
        });

        if (process.env.NODE_ENV === 'production') {
            Sentry.captureException(error, { extra: info });
        }        // 추가하게되면 프로덕션 환경에서도 sentry에 저장
    }

    render() {
        if (this.state.error) {
            return <h1>에러 발생!</h1>
        }
        return this.props.children;
				// 아래와 같이 감싸진 자식컴포넌트를 그대로 보여주겠다는 의미
    }
}

/*
    <ErrorBoundary>
        <User />
    </ErrorBoundary>     App.js 이와 같이 감싸서 렌더링 해준다.

*/
export default ErrorBoundary;