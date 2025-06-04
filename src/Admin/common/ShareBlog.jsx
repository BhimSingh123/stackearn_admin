import React from "react";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    PinterestShareButton,
    RedditShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon,
    TelegramIcon,
    PinterestIcon,
    RedditIcon,
} from "react-share";


const ShareBlog = ({ blogUrl, blogTitle, blogImage }) => {

    return (
        <div className="container mt-4">
            <div className="row text-center">

                <div className="col-4 mb-3">
                    <FacebookShareButton url={blogUrl} quote={blogTitle}>
                        <FacebookIcon size={50} round />
                    </FacebookShareButton>
                </div>

                <div className="col-4 mb-3">
                    <TwitterShareButton url={blogUrl} title={blogTitle}>
                        <TwitterIcon size={50} round />
                    </TwitterShareButton>
                </div>

                <div className="col-4 mb-3">
                    <WhatsappShareButton url={blogUrl} title={blogTitle}>
                        <WhatsappIcon size={50} round />
                    </WhatsappShareButton>
                </div>

                <div className="col-4 mb-3">
                    <LinkedinShareButton url={blogUrl} title={blogTitle}>
                        <LinkedinIcon size={50} round />
                    </LinkedinShareButton>
                </div>

                <div className="col-4 mb-3">
                    <TelegramShareButton url={blogUrl} title={blogTitle}>
                        <TelegramIcon size={50} round />
                    </TelegramShareButton>
                </div>

                <div className="col-4 mb-3">
                    <PinterestShareButton url={blogUrl} media={blogImage} description={blogTitle}>
                        <PinterestIcon size={50} round />
                    </PinterestShareButton>
                </div>

                <div className="col-4 mb-3">
                    <RedditShareButton url={blogUrl} title={blogTitle}>
                        <RedditIcon size={50} round />
                    </RedditShareButton>
                </div>


            </div>
        </div>
    );
};

export default ShareBlog;
