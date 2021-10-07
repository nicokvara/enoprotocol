import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styles  𐂂
const SP = styled.p`
  display: block;

  min-width: 650px;
  max-width: 650px;

  margin: 8px auto 0px auto;

  color: #f0405d;
`;

export default function Error(props) {
  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <SP>{props.msg}</SP>
    </motion.div>
  );
}
