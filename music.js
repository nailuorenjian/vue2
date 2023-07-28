var app = new Vue({
    el: "#app",
    data: {
        query: 'aurora',
        musicList: [],
        musicUrl: "",
        musicCover: "",
        hotComments: [],
        //遮罩层的显示
        isShow: false,
        isPlay: false,
        // mv
        mvUrl: "",
        musicDetail: ""
    },
    methods: {
        searchMusic: function() {
            var that = this;
            axios.get('https://autumnfish.cn/search?keywords=' + this.query)
                .then(function(response) {
                    console.log(response);
                    that.musicList = response.data.result.songs;
                    let firstId = response.data.result.songs[0].id;
                }, function(err) {});
        },
        playMusic: function(musicId) {
            var that = this;
            console.log(musicId);
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(function(response) {
                    console.log(response.data.data[0].url);
                    that.musicUrl = response.data.data[0].url;
                }, function(err) {})

            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then(function(response) {
                    console.log(response.data.songs[0].al.picUrl);
                    that.musicCover = response.data.songs[0].al.picUrl;
                    that.musicDetail = response.data.songs[0].name + "   ——   " +
                        response.data.songs[0].ar[0].name;
                }, function(err) {})

                // 获取评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then(function(response) {
                    console.log(response.data.hotComments);
                    that.hotComments = response.data.hotComments;
                }, function(err) {})
        },

        play() {
            this.isPlay = true;
        },
        pause() {
            this.isPlay = false;
            },
        // mv
        playMV: function(mvid) {
            this.musicUrl = "";
            var that = this;
            this.pause();
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                .then(function(response) {
                    console.log(response.data.data.url);
                    that.mvUrl = response.data.data.url;
                    that.isShow = true;
                }, function(err) {});
        },
        // 隐藏
        hiden: function() {
            this.isShow = false;
            this.mvUrl = "";
        }
    }
})
app.searchMusic();