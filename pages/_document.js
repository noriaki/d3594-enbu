import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

class DocumentContainer extends Document {
  render() {
    return (
      <html lang="ja">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
export default DocumentContainer;
