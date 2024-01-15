/**
 * 该工具类对标准类 WebSocket 进行了符合直觉的再封装
 * 最佳使用实践：
 * 1. 使用 WebSocket 的服务 url 进行实例化。
 * 2. 根据需求重写 onopen，onmessage，onclose，onclose 方法。
 * 3. 使用 create 方法初始化 WebSocket 连接。
 * 4. 使用 send 等方法发送主动消息，使用 onmessage 处理被动接收消息。
 */

/**
 * WebSocket readyState
 * 正在链接中：
 * WebSocket.CONNECTING = 0
 * 已经链接并且可以通讯：
 * WebSocket.OPEN = 1
 * 连接正在关闭：
 * WebSocket.CLOSING = 2
 * 连接已关闭或者没有链接成功：
 * WebSocket.CLOSED = 3
 */

import dayjs from "dayjs";

const consoleMode = import.meta.env.DEV;

export default class WS {
    private _socket: WebSocket | null
    private readonly _url: string
    private _pingTimer: number

    constructor(url: string) {
        this._socket = null;
        this._url = url;
        this._pingTimer = 0;
    }

    /**
     * create 建立 WebSocket 连接
     */
    create = () => {
        this._socket && this._socket.close();
        // this.webSocketInterval && clearInterval(this.webSocketInterval);
        if (!this._socket) {
            consoleMode && console.log('建立WebSocket链接', dayjs().format('YYYY-MM-DD HH:mm:ss'));
            this._socket = new WebSocket(this._url);
            this._socket.onopen = this.onopen;
            this._socket.onmessage = this.onmessage;
            this._socket.onerror = this.onerror;
            this._socket.onclose = this.onclose;
        } else {
            consoleMode && console.log('WebSocket已连接', dayjs().format('YYYY-MM-DD HH:mm:ss'));
        }
    }

    /**
     * send 发送数据
     * @param {any} message 需要发送的数据
     */
    send = (message: any) => {
        if (this._socket!.readyState === WebSocket.OPEN) {
            this._socket!.send(JSON.stringify(message));
            consoleMode && console.log('sendMessage', JSON.stringify(message));
        } else if ((this._socket as WebSocket).readyState === 0) {
            this.connecting(message);
        }
    }

    /**
     * connecting 发送数据但连接未建立时进行处理等待重发
     * @param {any} message 需要发送的数据
     */
    connecting = (message: any) => {
        setTimeout(() => {
            if (this._socket!.readyState === 0) {
                this.connecting(message);
            } else {
                this._socket!.send(JSON.stringify(message));
            }
        }, 1000);
    }

    /**
     * sendPing 发送心跳
     * @param {number} time 心跳间隔毫秒 默认5000
     * @param {string} ping 心跳名称 默认字符串ping
     */
    sendPing = (time = 5000, ping = 'ping') => {
        clearInterval(this._pingTimer);
        this._socket!.send(ping);
        this._pingTimer = window.setInterval(() => {
            this._socket!.send(ping);
        }, time);
    }

    /**
     * close 关闭 WebSocket 连接
     */
    close = () => {
        this._socket!.close();
    }

    /**
     * onopen 链接成功事件回调
     */
    onopen = () => {
        consoleMode && console.log('WebSocket链接成功', dayjs().format('YYYY-MM-DD HH:mm:ss'));
    }

    /**
     * onmessage 接收消息事件回调
     @param {any} res 接收的数据
     */
    onmessage = (res: any) => {
        consoleMode && console.log('WebSocket收到消息', res);
    }

    /**
     * onerror 错误事件回调
     * @param {any} e 错误事件信息
     */
    onerror = (e: Event) => {
        consoleMode && console.log(`WebSocket error: 
            \n target: ${(e.target as WebSocket).url}
            \n readyState: ${(e.target as WebSocket).readyState}
            \n type: ${e.type}`);
        if ((this._socket as WebSocket).readyState !== WebSocket.CLOSED) {
            consoleMode && console.log('WebSocket已断开....正在尝试重连', dayjs().format('YYYY-MM-DD HH:mm:ss'));
            this._socket = null;
            this.create();
        } else {
            this.close();
        }
    }

    /**
     * onclose 连接关闭事件回调
     */
    onclose = (e: Event) => {
        consoleMode && console.log('WebSocket连接已关闭', dayjs().format('YYYY-MM-DD HH:mm:ss'));
        consoleMode && console.log(`
            target: ${(e.target as WebSocket).url}
            \n readyState: ${(e.target as WebSocket).readyState}
            \n type: ${e.type}`);
    }
}





