'use client';

import { Component, ReactNode } from 'react';

import { FallBackProps } from './type/ErrorMessage';
import { ErrorBoundaryFallBack } from './ErrorMessage';

interface Props {
  children: ReactNode;
  fallback: ({ message }: FallBackProps) => ReactNode;
}

interface State {
  hasError: boolean;
  status: number;
  message?: string;
}

const defaultState: State = {
  hasError: false,
  status: 200,
};

const parseErrorCode = (code: string) => {
  return parseInt(code.substring(0, 3), 10);
};

/**
 * ErrorBoundary
 * @param Props
 * @param State
 * @returns ReactNode
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = defaultState;
  }

  static getDerivedStateFromError(error: Error) {
    //エラーメッセージを元にエラーステータスを生成させ、エラー画面で表現のエラー文面の切り替えを可能にする
    const errorCode = parseErrorCode(error.message);

    return {
      hasError: true,
      status: errorCode,
    };
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      //エラーステータスをフォールバックのコンポーネントへ渡すようにし、コンポーネントの拡張性を持たせる
      return this.props.fallback({ message: this.state.status.toString() });
    }

    return this.props.children;
  }
}

interface ExtendedProps {
  children: ReactNode;
}

/**
 * ErrorBoundaryをステータス毎にエラー画面を表示できるようにした機能拡張版
 * @param ExtendedProps
 * @returns
 */
export const ErrorBoundaryExtended = ({ children }: ExtendedProps) => {
  return (
    <ErrorBoundary fallback={ErrorBoundaryFallBack}>{children}</ErrorBoundary>
  );
};
