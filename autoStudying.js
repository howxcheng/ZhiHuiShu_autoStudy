var time_to_sec = function (time) {
    var s = '';

    var hour = time.split(':')[0];
    var min = time.split(':')[1];
    var sec = time.split(':')[2];

    s = Number(hour * 3600) + Number(min * 60) + Number(sec);

    return s;
};

(function () {
    const STUDY_TIME = 30 * 60 * 1000
    // 学习时间，默认30分钟
    const MAX_DELAY = 5 // 切课时的最大延迟，单位：秒

    const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

    const start = async function () {
        console.log('开始自动学习')
        var flag = true
        var studyTime = STUDY_TIME
        while (studyTime > 0) {
            minter = Math.floor(studyTime / 1000 / 60)
            second = studyTime / 1000 % 60
            console.log("正在检查...(剩余学习时间：" + minter + '分' + second + '秒)')
            const delay = Math.floor(Math.random() * MAX_DELAY * 1000) + 1000

            if (!/1\.5/.test($('.speedBox').attr('style')) && flag) {
                console.log('已提升至1.5倍速')
                $('.speedTab15').click()
            }

            if (!/liuchang/.test($('.definiBox').attr('style')) && flag) {
                console.log('画质已更改为流畅')
                $('.line1bq').click()
            }

            if ($('.volumeBox').find('.passVolume').width() != 0 && flag) {
                console.log('已静音')
                $('.volumeIcon').click()
            }

            if ($(".playButton")[0]) {
                $("#playButton")[0].click()
            }

            if ($(".dialog-test")[0]) {
                console.log('发现弹题，将在' + delay / 1000 + ' 秒后点击关闭')
                if ($("li.topic-item")[0] && $("div.btn")[0]) {
                    // 二次确认
                    await sleep(delay / 2)
                    $("li.topic-item")[0].click()
                    studyTime -= (delay)
                    await sleep(delay / 2)
                    $("div.btn")[0].click()
                }
            }
            if (flag) {
                await sleep(3000)
            }
            flag = false

            var now = time_to_sec($(".currentTime")[0].textContent)
            var all = time_to_sec($(".duration")[0].textContent)
            if (now / all >= 0.9) {
                console.log('本节完成，' + delay / 1000 + ' 秒后将切到下一课')
                await sleep(delay)
                $('.current_play').nextAll('.video')[0].click()
                flag = true
            }

            await sleep(1000)
            studyTime -= 1000
        }
    }

    start()
}())