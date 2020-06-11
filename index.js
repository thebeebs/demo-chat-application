var app = new Vue({
    el: "#app",
    data: {
        message: "",
        logs: [],
        status: "disconnected",
        socketAddress: "wss://1dw4ah8x85.execute-api.eu-west-2.amazonaws.com/Prod"
    },

    methods: {
        connect: function connect() {
            var _this = this;
            this.socket = new WebSocket(this.socketAddress);
            this.socket.onopen = function () {
                _this.status = "connected";
                _this.logs.push({ event: "Connected to", data: _this.socketAddress });
                _this.socket.onmessage = function (_ref) {
                    var data = _ref.data;
                    console.log(data);
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
            var ob = `{"message":"sendmessage","data": "${this.message}"}`
            this.socket.send(ob);
            this.logs.push({ event: "Sent message", data: this.message });
            this.message = "";
        }
    }
});
