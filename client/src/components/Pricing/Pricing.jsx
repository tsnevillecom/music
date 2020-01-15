import { Col, Row } from "antd";
import React, { Component } from "react";

class Pricing extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <h1 className="display-4">Pricing</h1>
          <Row>
            <Col span={8}>
              <h1>$0 / mo</h1>
              <ul>
                <li>10 users included</li>
                <li>2 GB of storage</li>
                <li>Email support</li>
                <li>Help center access</li>
              </ul>
              <button>Sign up for free</button>
            </Col>
            <Col span={8}>
              <h1>$15 / mo</h1>
              <ul>
                <li>20 users included</li>
                <li>10 GB of storage</li>
                <li>Priority email support</li>
                <li>Help center access</li>
              </ul>
              <button>Get started</button>
            </Col>
            <Col span={8}>
              <h1>$29 / mo</h1>
              <ul>
                <li>30 users included</li>
                <li>15 GB of storage</li>
                <li>Phone and email support</li>
                <li>Help center access</li>
              </ul>
              <button>Contact us</button>
            </Col>
          </Row>
          <p>
            Quickly build an effective pricing table for your potential
            customers with this Bootstrap example. It's built with default
            Bootstrap components and utilities with little customization.
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Pricing;
