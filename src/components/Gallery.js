import React, {Component} from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./Gallery.module.css";
import InnerImageZoom from "react-inner-image-zoom";
import carouselStyles from "../styles/Carousel.css";
import imageZoomStyles from "../styles/ImageZoom.css";


export class Gallery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentSlide: 0,
        };
    }

    componentWillReceiveProps = () => {
        this.setState(() => ({
            currentSlide: 0
        }));
    };

    next = () => {
        this.setState((state) => ({
            currentSlide: state.currentSlide + 1,
        }));
    };

    prev = () => {
        this.setState((state) => ({
            currentSlide: state.currentSlide - 1,
        }));
    };

    updateCurrentSlide = (index) => {
        const {currentSlide} = this.state;

        if (currentSlide !== index) {
            this.setState({
                currentSlide: index,
            });
        }
    };

    render() {
        let pictures = this.props.pictures;
        return (
            <div className={styles.NewGallery}>
                <div>
                    <button onClick={this.prev} className={styles.button}>
                        Previous
                    </button>
                    /
                    <button onClick={this.next} className={styles.button}>
                        Next
                    </button>
                    <span className={styles.status}>
                        ({this.state.currentSlide + 1} picture of {pictures.length})
                    </span>
                </div>
                <Carousel showArrows={false}
                          useKeyboardArrows
                          infiniteLoop
                    // autoPlay
                          interval={4000}
                          showThumbs={false}
                          showIndicators={false}
                          selectedItem={this.state.currentSlide}
                          onChange={this.updateCurrentSlide}
                          showStatus={false}
                          className={styles.carousel}
                >
                    {pictures.map((item, i) => {
                        return (
                            <div key={i}>
                                <div className={styles.imageContainer}>
                                    <InnerImageZoom src={item.src}
                                                    fullscreenOnMobile/>
                                </div>
                                <div className={styles.description}>
                                    <p>
                                        <span>{item.name && item.name + ', '}</span>
                                        {item.size && item.size + ', '}
                                        {item.material && item.material + ', '}
                                        {item.price}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </Carousel>
            </div>
        )
    }
}

export default Gallery;