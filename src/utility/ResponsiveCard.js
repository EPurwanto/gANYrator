import PropTypes from 'prop-types';
import React from 'react';
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";

/**
 * Properties
 * name
 * desc
 * onClick
 * @param props
 * @returns {*}
 * @constructor
 */
const ResponsiveCard = (props) => {
    return (
        <Card as={props.onClick ? "button" : "div"} className="responsive-card text-left w-100 h-100" onClick={props.onClick ? props.onClick : false}>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                {
                    props.sub && <Card.Subtitle>{props.sub}</Card.Subtitle>
                }
                <Card.Text>{props.desc}</Card.Text>
            </Card.Body>
            {
                props.links && <Card.Footer className="text-right">
                    {
                        props.links.map((link) => {
                            const name = link.name;
                            const icon = link.icon;
                            delete link.name;
                            delete link.icon;

                            return (
                                <Card.Link
                                    as={Button}
                                    key={name}
                                    href="#"
                                    {...link}
                                    onClick={(e) => {e.stopPropagation(); link.onClick(e)}}>
                                    {name} {icon && <i className={"fa fa-" + icon}/>}
                                </Card.Link>
                            )
                        })
                    }
                </Card.Footer>
            }
        </Card>
    );
};

ResponsiveCard.propTypes = {
    name: PropTypes.string.isRequired,
    sub: PropTypes.string,
    desc: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }))
};

ResponsiveCard.defaultProps = {

};

export default ResponsiveCard;