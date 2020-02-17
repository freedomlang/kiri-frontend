import React, { memo } from 'react'
import './style.scss';

function About () {
    return (
        <div className="aboutMe">
            <p>about me</p>
            <div className="row">
                <div className="col-4">
                    <h3 className="section-title">
                        关于我
                    </h3>
                    <p className="mt-2">
                        一枚前端开发工程狮
                    </p>
                </div>
                <div className="col-8">
                    这不是一个完完全全的技术博客，只是一个前端开发攻城狮的自留地；所以除了技术文章之外，这里会有我的一些吐槽和生活记录。
                </div>
            </div>
        </div>
    )
}

export default memo(About);