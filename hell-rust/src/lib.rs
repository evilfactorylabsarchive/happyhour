use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn raw_to_md5(string: &str) -> String {
    let digest = md5::compute(string);
    format!("{:?}", digest)
}

#[test]
fn test_raw_to_md5() {
    let expected = "5eb63bbbe01eeed093cb22bb8f5acdc3";
    let actual = raw_to_md5("hello world");
    assert_eq!(actual, expected);
}
