"use client"

import { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { InfoTwo } from '@/types/app/my';
import "./index.scss"

export default ({ data }: { data: InfoTwo }) => {
    const ss = data.left_tags.concat(data.right_tags);

    useEffect(() => {
        AOS.init()
    }, [])

    return (
        <>
            <section className='mt-16'>
                <div className="about-me">
                    <div className="info-left">
                        {data.left_tags.map((t, index) => (
                            <span key={index} className="tag dark:text-white dark:bg-[#36404d] dark:border-[#4e5969] transition-colors">{t}</span>
                        ))}
                    </div>

                    <div className="avatar">
                        <img src={data.avatar_url} alt={data.author} className="avatar-img dark:!border-[rgba(56,64,76)] transition-colors" />
                    </div>

                    <div className="info-right">
                        {data.right_tags.map((t, index) => (
                            <span key={index} className="tag dark:text-white dark:bg-[#36404d] dark:border-[#4e5969] transition-colors">{t}</span>
                        ))}
                    </div>
                </div>

                <div className="about-me-2">
                    <button className="trigger">{data.author}</button>

                    {/* {ss.map((s, index) => (
                        <button key={index} className="trigger">{s}</button>
                    ))} */}
                </div>
            </section>
        </>
    )
}