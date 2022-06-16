export const getType = obj => {
	let str = Object.prototype.toString.call(obj);
	return str
		.substr(1, str.length - 2)
		.split(" ")[1]
		.toLowerCase();
};
export function isTel(s) {
	var reg = /^(\d{3,4})?\d{7,8}$/;
	if (!reg.test(s)) {
		return false;
	}
	return true;
}
export function isPhone(s) {
	var reg = /^1[356789]\d{9}$/;
	if (!reg.test(s)) {
		return false;
	}
	return true;
}
export const isArray = obj => Object.prototype.toString.call(obj) === "[object Array]";
export const hideTel = tel => tel.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
export const pwdReg = /^(?![A-z0-9]+$)(?=.[^%&',;=?$\x22])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$/;

export const isEmptyObj = obj => {
	for (let _ in obj) {
		return 0;
	}
	return 1;
};
export const getRandom = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * 
 localStorage存取数据
 */
export const setItem = (key, value) => {
	if (typeof value === "object") {
		value = JSON.stringify(value);
	}
	window.localStorage.setItem(key, value);
};
export const getItem = key => {
	const data = window.localStorage.getItem(key);
	try {
		return JSON.parse(data);
	} catch (err) {
		return data;
	}
};
export const removeItem = key => {
	window.localStorage.removeItem(key);
};
/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
export function obj2String(obj, arr = [], idx = 0) {
	for (let item in obj) {
		arr[idx++] = [item, obj[item]];
	}
	return new URLSearchParams(arr).toString();
}

/**
 * 时间格式化
 * @param date  时间  Date对象
 * @param fmt  格式 ‘yyyy-MM-dd HH:mm:ss’
 * @returns {*} 格式化后的时间  "2018-09-06 10:15:59"
 * @constructor
 */
export const Dateformat = (date, fmt) => {
	var o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
		"H+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		S: date.getMilliseconds(), //毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return fmt;
};

/**
 * 获取html字符串中的文字内容（去掉标签）
 * @param htmlcontent
 * @return
 */
export const filterText = str => {
	if (!str) return str;
	str = str.replace(/<\/?[^>]*>/g, ""); // 去除HTML tag
	str = str.replace(/[ | ]*\n/g, "\n"); // 去除行尾空白
	str = str.replace(/ /gi, ""); // 去掉
	str = str.replace(/&nbsp;/g, ""); // 去掉
	return str;
};

export function debounce(callback, time) {
	// 定时器
	let timer = null;
	// 返回一个函数
	return function(e) {
		// 1 在一定时间内再次触发事件说明已经存在一个定时器在工作，清空当前工作的定时器。
		// 2 但是如果定时器的回调已经执行过了，再次触发事件时定时器变量不为空
		// 而是上一次定时器执行结束的值，所以还会执行下面代码，但是这是无用的，需要在定时器里的回调执行结束后把定时器变量设为null
		if (timer !== null) {
			// 清空定时器
			clearTimeout(timer);
		}
		// 启动定时器
		timer = setTimeout(() => {
			// 执行回调
			callback.call(this, e);
			// 重置定时器变量为null
			timer = null;
		}, time);
	};
}

export function throttle(callback, wait) {
	// 定义开始时间
	let start = 0;
	// 返回结果是一个函数
	return function(e) {
		// 获取当前时间戳
		let now = Date.now();
		if (now - start >= wait) {
			// 如果满足条件 就执行回调函数
			callback.call(this, e);
			start = now;
		}
	};
}

// 检测是全屏
export function isFullscreen() {
	var fullscreenEle = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	return fullscreenEle;
}
/**页面最大化 */
export function requestFullScreen() {
	const docElm = document.documentElement;
	if (docElm.requestFullscreen) {
		docElm.requestFullscreen();
	} else if (docElm.msRequestFullscreen) {
		docElm.msRequestFullscreen();
	} else if (docElm.mozRequestFullScreen) {
		docElm.mozRequestFullScreen();
	} else if (docElm.webkitRequestFullScreen) {
		docElm.webkitRequestFullScreen();
	}
}
/**退出最大化 */
export function exitFullscreen() {
	const de = window.parent.document;

	if (de.exitFullscreen) {
		de.exitFullscreen();
	} else if (de.mozCancelFullScreen) {
		de.mozCancelFullScreen();
	} else if (de.webkitCancelFullScreen) {
		de.webkitCancelFullScreen();
	} else if (de.msExitFullscreen) {
		de.msExitFullscreen();
	}
}
