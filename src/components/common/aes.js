import CryptoJS from "crypto-js";

var iv = '%oien0BpE^eLQ97F';
var key = "Y4vR9Za#gaLZN6U7lu@ftNHm&GbmckB0";

var encryptionKey = CryptoJS.enc.Utf8.parse(key);
var iv = CryptoJS.enc.Utf8.parse(iv);

export default {
	encrypt(message) {
		var encrypted = CryptoJS.AES.encrypt(message, encryptionKey, { iv: iv });
		return encrypted.toString();
	},
	decrypt(message) {
		console.log(message)
		message = message.replace(/\s+/g, "+")
		var decrypted = CryptoJS.AES.decrypt(message, encryptionKey, { iv: iv });
		return decrypted.toString(CryptoJS.enc.Utf8);
	}
};