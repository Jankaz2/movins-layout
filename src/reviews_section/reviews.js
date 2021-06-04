import React, {Component} from 'react'
import ReviewsCss from './reviews.scss'
import man1 from './images/man1.png'
import woman11 from './images/woman11.png'
import woman1 from './images/woman1.png'

class Reviews extends Component {
    render() {
        return (
            <section className='reviews-section row'>
                <div className='row'>
                    <h2 className='font-link'>Our users know why we are the best!</h2>
                </div>
                <div className='row'>
                    <div className='review col span-1-of-3'>
                        <blockquote>
                            <p className='font-link'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Accusantium distinctio dolore dolorum enim laboriosam minus
                                officiis possimus provident quam quia quis ratione, rem soluta.
                                Architecto, cupiditate debitis, dicta eaque facilis fugit inventore,
                                numquam obcaecati odio quae reiciendis sed tenetur vero!
                            </p>
                            <cite><img src={man1} alt={'man'}/> Maddox Villa</cite>
                        </blockquote>
                    </div>
                    <div className='review col span-1-of-3'>
                        <blockquote>
                            <p className='font-link'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Doloribus fuga ipsum libero, provident quaerat quasi qui veniam.
                                Consequatur doloribus eaque est explicabo fugit iusto, labore, minima minus,
                                molestias obcaecati officia placeat possimus quasi qui voluptas.
                                Lorem ipsum dolor sit amet.
                            </p>
                            <cite><img src={woman11} alt={'woman'}/> Izabel Kline</cite>
                        </blockquote>
                    </div>
                    <div className='review col span-1-of-3'>
                        <blockquote>
                            <p className='font-link'> Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Ab aspernatur, atque autem consequatur consequuntur debitis
                                dicta est exercitationem fugiat, inventore laborum magnam nemo
                                perspiciatis qui quisquam reiciendis repudiandae tempore voluptates?
                                Alias ea hic libero magni optio quam sequi.
                            </p>
                            <cite><img src={woman1} alt={'woman'}/> Caprice Francis</cite>
                        </blockquote>
                    </div>
                </div>
            </section>
        );
    }
}

export default Reviews