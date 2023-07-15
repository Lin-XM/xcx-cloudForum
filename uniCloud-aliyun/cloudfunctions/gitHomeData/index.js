'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log(event)
	const {navList,tabActive} = event
	let artTmp = db.collection("xm-article").field(
			'user_id,title,content,publish_date,like_count,view_count,comment_count,descrtion,province,piculs'
		)
		.getTemp()
	let userTmp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file.url").getTemp()
	// return await db.collection(artTmp, userTmp).orderBy(navList[tabsActive].type, 'desc').get()
	//返回数据给客户端
	return event
};