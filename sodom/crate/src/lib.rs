#[macro_use]
extern crate cfg_if;

extern crate dodrio;
extern crate wasm_bindgen;
extern crate web_sys;

use dodrio::{
    bumpalo::{format, Bump},
    Node, Render, Vdom,
};

use wasm_bindgen::prelude::*;

cfg_if! {
    if #[cfg(feature = "console_error_panic_hook")] {
        extern crate console_error_panic_hook;
        use console_error_panic_hook::set_once as set_panic_hook;
    } else {
        #[inline]
        fn set_panic_hook() {}
    }
}

cfg_if! {
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

pub struct Hello<'n> {
    name: &'n str,
}

impl<'n> Render for Hello<'n> {
    fn render<'a, 'bump>(&'a self, bump: &'bump Bump) -> Node<'bump>
    where
        'a: 'bump,
    {
        use dodrio::builder::*;

        let msg = format!(in bump, "Virtual DOM is {}", self.name);

        div(bump)
            .children([
                h2(bump).children([text(msg.into_bump_str())]).finish(),
                p(bump).children([text("nice")]).finish(),
            ])
            .finish()
    }
}

#[wasm_bindgen]
pub fn run() -> Result<(), JsValue> {
    set_panic_hook();

    let window = web_sys::window().unwrap();
    let document = window.document().unwrap();
    let body = document.body().unwrap();

    let hello_component = Hello { name: "Sucks" };

    let vdom = Vdom::new(&body, hello_component);

    vdom.forget();

    Ok(())
}
