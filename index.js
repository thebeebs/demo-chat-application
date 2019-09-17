var socketAddress = 'wss://wrewer32.exec3ute-api.eu-west-1.amazonaws.com/Prod';
var app = new Vue({
    el: "#app",
    data: {
        message: "",
        logs: [],
        status: "disconnected"
    },

    methods: {
        connect: function connect() {
            var _this = this;
            this.socket = new WebSocket(socketAddress);
            this.socket.onopen = function () {
                _this.status = "connected";
                _this.logs.push({ event: "Connected to", data: socketAddress });
                _this.socket.onmessage = function (_ref) {
                    var data = _ref.data;
                    _this.logs.push({ event: "Recieved message", data: data });
                };
            };
        },
        disconnect: function disconnect() {
            this.socket.close();
            this.status = "disconnected";
            this.logs = [];
        },
        sendMessage: function sendMessage(e) {
            var ob = `{"action":"sendmessage","data": "${this.message}"}`
            this.socket.send(ob);
            this.logs.push({ event: "Sent message", data: this.message });
            this.message = "";
        }
    }
});