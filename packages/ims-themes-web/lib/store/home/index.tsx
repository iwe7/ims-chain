import "./index.scss";
import React = require("react");
import { Injector } from 'ims-core';
import { ImsIpfs } from 'ims-web';
import { fromEvent } from 'rxjs';
import JSZip = require('jszip')

export class ImsStoreHome extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      keys: []
    }
  }

  get ipfs(): Promise<ImsIpfs> {
    return Injector.get<ImsIpfs>(ImsIpfs)
  }

  async componentDidMount() {
    const ipfs = await this.ipfs;
    const keys = await ipfs.key.list();
    this.setState({
      keys
    })
    const appFile = this.refs.app as HTMLInputElement;
    fromEvent(appFile, 'change').subscribe(async res => {
      const files = (res.target as any).files;
      const entries = [];
      const fileEntries = [];
      const results = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileEntries.push(
          JSZip.loadAsync(file).then(zip => {
            zip.forEach((relativePath, zipEntry) => {
              if (!zipEntry.dir) {
                entries.push(zipEntry.async('text').then(res => {
                  console.log(res);
                  results.push({
                    path: relativePath,
                    content: res
                  })
                }))
              }
            })
          })
        )
      }
      await Promise.all(fileEntries);
      await Promise.all(entries);
      const addResults = await ipfs.add(results);
      const hash = addResults[addResults.length - 1].hash;
      ipfs.name.publish(`/ipfs/${hash}`).then(res => {
        console.log('publish', res);
      });
      const subs = ipfs.name.pubsub.subs()
      console.log(subs);
    })
  }

  async newApp() {
    const name = (this.refs.appname as any).value;
    const ipfs = await this.ipfs;
    const res = await ipfs.key.gen(name);
    console.log(res)
  }

  render() {
    const { keys } = this.state;
    return <div>
      <input type="text" ref="appname" />
      <button onClick={e => this.newApp()}>新建应用</button>

      <input type="file" ref="app" />
      <ul>
        {keys.map((key, index) => <li key={index}>{key.name}-{key.id}</li>)}
      </ul>
    </div>;
  }
}
