window.onload = () => {

    const n = 100;
    const data = [...Array(n)].map((_, i) => i);

    for (let i = n - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [data[i], data[r]] = [data[r], data[i]];
    }

    console.log(data);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const barwid = width / n;
    const context = {
        n: n,
        canvas: canvas,
        ctx: ctx,
        width: width,
        height: height,
        barwid: barwid
    };

    draw(context, data);
    let dataset = insertionSort(data);

    const options = document.querySelectorAll('#selector option');
    console.log("op", options);
    const selector = document.getElementById('selector');
    selector.addEventListener('change', function () {
        clearAll(context);
        draw(context, data);
        const index = this.selectedIndex;
        const value = options[index].value;
        console.log(value);
        if (value === 'insert') dataset = insertionSort(data);
        else if (value === 'bubble') dataset = bubbleSort(data);
        else if (value === 'shell') dataset = shellSort(data);
        else if (value === 'marge') dataset = margeSort(data);
    })
    console.log(dataset);

    const stepbtn = document.getElementById('step');
    let index = 0;
    stepbtn.addEventListener('click', () => {
        if (index >= dataset.length) return;
        console.log(index);
        clearAll(context);
        draw(context, dataset[index]);
        console.log(dataset[index]);
        index += 1;
    });

    const startbtn = document.getElementById('start');
    startbtn.addEventListener('click', () => {
        let cou = 0;
        const si = setInterval(() => {
            if (cou >= dataset.length) {
                clearInterval(si);
                return;
            }
            console.log(cou);
            clearAll(context);
            draw(context, dataset[cou]);
            // console.log(dataset[index]);
            cou += 1;
        }, 100);
    });

    const resetbtn = document.getElementById('reset');
    resetbtn.addEventListener('click', () => {
        clearAll(context);
        draw(context, data);
    });

    console.log(data);
}

const draw = (ctx, data) => {
    data.forEach((d, i) => {
        ctx.ctx.fillStyle = 'red';
        ctx.ctx.lineWidth = 0.5;
        ctx.ctx.fillRect(i * ctx.barwid, ctx.height - ctx.height / (ctx.n + 1) * d, ctx.barwid, ctx.height / (ctx.n + 1) * d);
        ctx.ctx.strokeRect(i * ctx.barwid, ctx.height - ctx.height / (ctx.n + 1) * d, ctx.barwid, ctx.height / (ctx.n + 1) * d);

    })

}

const clearAll = ctx => {
    ctx.ctx.clearRect(0, 0, ctx.width, ctx.height);
}

const insertionSort = data => {
    const n = data.length;
    const pre = [...data];
    const retdata = [];
    retdata.push(data);

    for (let i = 1; i < n; i++) {
        for (let j = i; j > 0; j--) {
            if (pre[j] < pre[j - 1]) {
                // pre.splice(j - 1, j, pre[j], pre[j - 1]);
                [pre[j - 1], pre[j]] = [pre[j], pre[j - 1]];
                const d = [...pre];
                retdata.push(d);
            } else {
                break;
            }
        }
    }
    return retdata;
}

const bubbleSort = data => {
    const n = data.length;
    const pre = [...data];
    const retdata = [];
    retdata.push(data);

    for (let i = 0; i < n - 1; i++) {
        for (let j = n - 1; j > i; j--) {
            if (pre[j - 1] > pre[j]) {
                [pre[j - 1], pre[j]] = [pre[j], pre[j - 1]];
                const d = [...pre];
                retdata.push(d);
            }
        }
    }

    return retdata;
}

const shellSort = data => {
    const n = data.length;
    const g = [];
    let retdata = [];
    retdata.push(data);
    const pre = [...data];

    g.push(1);
    for (let i = 1; g[i - 1] < n; i++) {
        const gn = g[i - 1] * 3 + 1;
        g.push(gn);
    }

    for (let i = g.length - 1; i >= 0; i--) {
        const sd = _shellSort(pre, n, g[i]);
        retdata = retdata.concat(sd);
    }
    // console.log(retdata);
    return retdata;
}

const _shellSort = (data, n, g) => {
    let retdata = [];

    for (let i = g; i < n; i++) {
        for (let j = i - g; j >= 0; j -= g) {
            if (data[j] > data[j + g]) {
                [data[j], data[j + g]] = [data[j + g], data[j]];
                const rd = [...data];
                retdata.push(rd);
            } else {
                break;
            }
        }
    }
    return retdata;
}

const margeSort = data => {

    const _margeSort = (left, right) => {
        if (left + 1 < right) {
            const mid = Math.floor((left + right) / 2);
            // console.log("left", left, "mid ", mid, "right", right);

            _margeSort(left, mid);
            _margeSort(mid, right);
            _marge(left, mid, right);
            // console.log("left", left, "mid ", mid, "right", right, "pre ", pre);
        }
    }

    const _marge = (left, mid, right) => {
        let arr1 = globdata.slice(left, mid);
        let arr2 = globdata.slice(mid, right);
        // if (arr1.length === 0 && arr2.length === 0) return;
        // console.log(data);
        console.log("left", left, "mid ", mid, "right", right);
        console.log("arrs", arr1, arr2);

        let tmpdata = [];
        while (1) {
            if (arr1.length === 0) {
                // console.log("hi");
                tmpdata = tmpdata.concat(arr2);
                break;
            } else if (arr2.length === 0) {
                tmpdata = tmpdata.concat(arr1);
                break;
            } else if (arr1[0] < arr2[0]) {
                tmpdata.push(arr1.shift());
            } else {
                tmpdata.push(arr2.shift());
            }
        }
        console.log(tmpdata);
        // console.log('data in marge : ', data);
        const head = globdata.slice(0, left);
        const tail = globdata.slice(right, globdata.length);
        // console.log("ht", head, tail);
        const pd = globdata = head.concat(tmpdata.concat(tail));
        returndata.push(pd);
        console.log("glob", pd);

        // const hd = data.slice(0, left);
        // const tl = data.slice(right, data.length);
        // data = [...hd.concat(tmpdata.concat(tl))];
    }


    const t = [...data];
    let globdata = [...data];
    let returndata = [];
    returndata.push(data);
    _margeSort(0, t.length);

    return returndata;
}