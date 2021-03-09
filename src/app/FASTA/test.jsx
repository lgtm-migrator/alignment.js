import React from "react";
import Alignment from "../../Alignment.jsx";
import fastaParser from "../../helpers/fasta.js";

const fasta = `>Human
AAAGAGATTACGAATGCCTTGGAAACCTGGGGTGCCTTGGGTCAGGACATCAACTTGGACATTCCTAGTTTTCAAATGAGTGATGATATTGACGATATAAAATGGGAAAAAACTTCAGACAAGAAAAAGATTGCACAATTCAGAAAAGAGAAAGAGACTTTCAAGGAAAAAGATACATATAAGCTATTTAAAAATGGAACTCTGAAAATTAAGCAT---CTGAAGACCGATGATCAGGATATCTACAAGGTATCAATATATGATACAAAAGGAAAAAATGTGTTGGAAAAAATATTTGATTTGAAGATTCAAGAGAGGGTCTCAAAACCAAAGATCTCCTGGACTTGTATCAACACAACCCTGACCTGTGAGGTAATGAATGGAACTGACCCCGAATTAAACCTGTATCAAGATGGGAAACATCTAAAA---CTTTCTCAGAGGGTCATCACACACAAGTGGACCACCAGCCTGAGTGCAAAATTCAAGTGCACAGCAGGGAACAAAGTCAGCAAGGAATCCAGTGTCGAGCCTGTCAGCTGTCCAGAGAAAGGTCTGGAC
>Chimp
GAAGAGATTACGAATGCCTTGGAAACCTGGGGTGCCTTGGGTCAGGACATCAACTTGGACATTCCTAGTTTTCAAATGAGTGATGATATTGACGATATAAAATGGGAAAAAACTTCAGACAAGAAAAAGATTGCACAATTCAGAAAAGAGAAAGAGACTTTCAAGGAAAAAGATACATATAAGCTATTTAAAAATGGAACTCTGAAAATTAAGCAT---CTGAAGACCGATGATCAGGATATCTACAAGGTATCAATATATGATACAAAAGGAAAAAATGTGTTGGAAAAAATATTTGATTTGAAGATTCAAGAGAGGGTCTCAAAACCAAAGATCTCCTGGACTTGTATCAACACAACCCTGACCTGTGAGGTAATGAATGGAACTGACCCCGAATTAAACCTGTATCAAGATGGGAAACATCTAAAA---CTTTCTCAGAGGGTCATCACACACAAGTGGACCACCAGCCTGAGTGCAAAATTCAAGTGCACAGCAGGGAACAAAGTCAGCAAGGAATCCAGTGTCGAGCCTGTCAGCTGTCCAGAGAAAGGTCTGGAC
>Baboon
AAAGAGATTAGGAATGCTTTGGAAACCTGGGGAGCGCTGGGTCAGGACATCGACTTGGACATTCCTAGTTTTCAAATGAGTGATGATATTGATGATATAAAATGGGAGAAAACTTCAGACAAGAAAAAGATTGCACAATTCAGAAAAGAGAAGGAGACTTTCGAGGAAAAAGATGCATATAAGCTATTTAAAAACGGAACTCTGAAAATTAAGCAT---CTGAAGATCCATGATCAGGATAGCTACAAGGTATCAATATACGATACAAAAGGAAAAAATGTGTTGGAAAAAACATTTGATTTGAAGATTCAAGAGAGGGTCTCAGAACCAAAGATCTCCTGGACTTGTATCAACACAACCCTGACCTGTGAAGTAATGAATGGAACTGACCCCGAATTAAACCTGTATCAAGATGGGAAACATCTAAAA---CTTTCTCAGAGGGTCATCACACACAAGTGGACCACCAGCCTGAGTGCGAAATTCAAGTGCACAGCAGGGAACAAAGTCAGCAAGGAATCCAGGATGGAGACTGTCAGCTGTCCAGAGAAAGGTCTGGAC
>RhMonkey
AAAGAGATTAGGAATGCTTTGGAAACCTGGGGAGCGCTGGGTCAGGACATCGACTTGGACATTCCTAGTTTTCAAATGAGTGATGATATTGATGATATAAGATGGGAAAAAACTTCAGACAAGAAAAAGATTGCACAATTCAGAAAAGAGAAGGAGACTTTCGAGGAAAAAGATGCATATAAGCTATTTAAAAACGGAACTCTGAAAAYTAAGCAT---CTGAAGATCCATGATCAGGATAGCTACAAGGTATCAATATACGATACAAAAGGAAAAAATGTGTTGGAAAAAACATTTGATTTGAAGATTCAAGAGAGGGTCTCAGAACCAAAGATCTCCTGGACTTGTATCAACACAACCCTGACCTGTGAAGTAATGAATGGAACTGRCCCCGAATTAAACCTGTATCAAGATGGGAAACATGTAAAA---CTTTCTCAGAGGGTCATCACACACAAGTGGACCACCAGCCTGAGTGCGAAATTCAAGTGCACAGCAGGGAACAAAGTCAGCAAGGAATCCAGGATGGAGACTGTCAGCTGTCCAGAGAAAGGTCTGGAC
>Cow
------------GAAAGCATTGTCGTCTGGGGTGCCCTGGATCATGACCTCAACCTGGACATTCCTGGTTTTCCAAGAAGTGATATAGTGGCAGATATAAAATGGAACAGA------AACAAAAACAAGATTGCACGAATAAAGAAAGATATGCCACTTCACAATGAAATGGACAAATATGATATGTTTACAAATGGAACTCTGAAAATTAAAACT---CTGATGAGAAACGATAGTGGTCTCTATGAGGTAGAGGTTTATGATTCAAATGGAGTAAACCTACTGAGCAAAAAATTTGATTTGAAGATTCAAGAGATGCTCTCAGGACCTGAAATTAACTGGATCTGTACCAACAGAACTGTGAGCTGCAAGGTAGAAAATGGAAGTAATCCTAAATTACAACTGTTTTTAAATACGACCCGTGTCAAACAAGATCATGGGAAGCTCATCACCTACACGTGGAACACCAGATGGAATAAAACATTCAAGTGCGTGGCGAGTAACCATGTCGATAGCAAAGTCAGCATAGAGATCGCCGTGTGTCCAGATGAAGGTCTGGAT
>Pig
---------------ACTGAGGTTGTCTGGGGCATCGTGGATCAAGACATCAACCTGGACATTCCTGAACTTTCAAAACATGATAACGTAGATCATATACGATGGCAGAAG------AATGAAAACAAGATCGCAGAATTTAAAAAAAACAAAGAAACTCACCCTGTGAAAGACACATACATGATGTTACCAAATGGAACTCTGAGAATTAAAGAT---CTGAAGAGAGATGATGAGGGTATCTACAAGGTAACTGTCTATGCTACGGATGGAAAACACATGCTGGAGAGAAAATTTGATTTGCCGATTCTAGATGGGGTCTCAAAACCTGTAATCTCCTGGAGCTGTGCCGACAAAACGGTGACCTGTGAGGTAGCAGAAGGAAGTGACCCTAAGTTAAAACTGTATGTAAATAAGTCCACTGCCAGAGAAGGTCGTCAGAAGGTCATCCTGTGGAAGTGGAACACCAAATGGAGCACATTATTCAAGTGTGTGGCCAGTAACAACGCCAGTGAGCAAATCAGCATGGTGACCATCAGTTGTACGGGGCAAGGTCTGGAT
>Horse
------------AAGAATATCACCATCTTGGGTGCCCTGGAACGTGATATCAACCTGGACATTCCTGCTTTTCAAATGAGTGAGCATGTAGAAGATATACAATGGAGCAAA------GGAAAAACCAAGATTGCAAAATTCAAAAATGGCAGTATGACTTTCCAGAAAGATAAAACATACGAGGTATTAAAAAATGGAACTCTGAAAATTAAACAT---CTGGAGAGAATTCATGAAGGTACCTACAAGGTAGACGCATATGATAGTGATGGAAAAAATGTGTTGGAGGAAACATTTCATTTGAGCCTTCTAGAGATGGTCTCAAAACCTAATATCTCCTGGAGCTGCACCAACACCACCCTGACCTGCGAGGTGACAAAAGGAACTGACTTTGAGTTAAAACTCTATCTAAATGGGAGAATGATCCAAAAAAGTCCTCGCAAAGTCATCGTATACAAGCGGGCCAGCAACCAAATTGCGTCCTTCAAGTGCACAGCCAATAACACAGTCAGCGAGGAAAGCAGCTCTGTGGTCATCAGGTGTACAGAGAAAGGTCTGGAT
>Cat
---------GCAAATGATGATATCGTCTGGGGTACCCTGGGTCAGGACATCAACCTGGACATTCCTGATTCTCAA---GGGATTAATATAGATGATATACACTGGGAAAAA------GGCAAGAAGAAGGTGGCGAGGTTCCAAATTAGCAACAAGCCTAAGAATCCAGATGAAAAATATAATGTGTCAATGAATGGAACTCTGAAAATTAAACAT---CTGATGCTAGAAGACTGCGATACCTACAAGGTTGTTATATACGATAAGGATGGAAAGAATGTGTTGGATAAAACATTTCAGCTGAAGATTCAAGAGAAGGTCTCAACGCCTAACATCGACTGGAATTGTATCAACAAAACCCTGGTCTGTAAGGTATCAAATGGAACAGACCCTGAATTAAAACTGTACGTAAATGGGACCAGTATCAAGCCCGTTTCTTCGAAGTTCAGCACATACAGGTTTATAAACAAGCAGAAGATATTAGTCAACTGCACGGCAGAAAACAAAGTCAGCAAGGAAAGCGACGTGAAGATGATCACTTGTTCAGAGAAGGGTCTGGAC
>Mouse
---------AGAGACAATGAGACCATCTGGGGTGTCTTGGGTCATGGCATCACCCTGAACATCCCCAACTTTCAAATGACTGATGATATTGATGAGGTGCGATGGGTAAGG------AGGGGCACCCTGGTCGCAGAGTTTAAAAGGAAGAAGCCACCTTTTTTGATATCAGAAACGTATGAGGTCTTAGCAAACGGATCCCTGAAGATAAAGAAGCCGATGATGAGAAACGACAGTGGCACCTATAATGTAATGGTGTATGGCACAAATGGGATGACTAGGCTGGAGAAGGACCTGGACGTGAGGATTCTGGAGAGGGTCTCAAAGCCCATGATCCACTGGGAATGCCCCAACACAACCCTGACCTGTGCGGTCTTGCAAGGGACAGATTTTGAACTGAAGCTGTATCAAGGGGAAACACTACTCAATAGTCTCCCCCAGAAGAACATGAGTTACCAGTGG---ACCAACCTGAACGCACCATTCAAGTGTGAGGCGATAAACCCGGTCAGCAAGGAGTCTAAGATGGAAGTTGTTAACTGTCCAGAGAAAGGTCTGTCC
>Rat
---------AGAGACAGTGGGACCGTCTGGGGTGCCCTGGGTCATGGCATCAACCTGAACATCCCTAACTTTCAAATGACTGATGATATTGATGAGGTGCGATGGGAGAGG------GGGAGCACCCTGGTTGCCGAGTTTAAAAGGAAGATGAAGCCTTTTTTGAAATCGGGAGCATTTGAGATCTTAGCAAATGGAGACTTGAAGATAAAGAAT---CTGACAAGAGATGACAGTGGCACCTATAATGTAACGGTATACAGCACAAATGGGACACGTATCCTGGACAAGGCACTGGACTTGAGGATTCTAGAGATGGTCTCAAAGCCGATGATCTACTGGGAGTGCAGCAACGCAACCCTGACCTGTGAGGTCTTGGAAGGAACAGATGTTGAACTAAAGCTGTACCAAGGAAAGGAGCATCTCAGGAGCCTCCGTCAGAAGACCATGAGTTACCAGTGG---ACCAACCTGAGAGCACCGTTTAAGTGCAAGGCGGTAAACAGGGTCAGCCAGGAGTCTGAGATGGAAGTTGTCAACTGTCCAGAGAAAGGTCTGCCC`;

function Test() {
  return React.createElement(
    Alignment,
    { fasta: fastaParser(fasta), centerOnSite: 100 },
    null
  );
  return (
    <>
      <h1>A test</h1>
      <p>This is a generic spot just to test things out before committing.</p>
    </>
  );
}

export default Test;
