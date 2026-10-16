(function () {
  const { findByProps } = vendetta.metro;
  const { React, ReactNative } = vendetta.metro.common;
  const { before, after } = vendetta.patcher;
  const { storage } = vendetta.plugin;
  const { FormSection, FormSwitchRow } = vendetta.ui.components.Forms;

  // Row labels to hide (storage key = label). All on by default.
  const ROWS = ["Apps", "Mark Unread", "Copy Text", "Create Thread", "Edit Message", "Delete Message", "Message", "Mention", "Reply"];

  const patched = new WeakSet();
  let unpatches = [];

  const isHidden = (el, set) => {
    const p = el && el.props;
    return !!p && [p.label, p.title, p.text, p.accessibilityLabel, p.children].some(
      (v) => typeof v === "string" && set.has(v.trim().toLowerCase())
    );
  };

  function strip(node, set, seen) {
    if (!node || typeof node !== "object" || seen.has(node)) return;
    seen.add(node);
    if (Array.isArray(node)) {
      for (let i = node.length - 1; i >= 0; i--) {
        if (isHidden(node[i], set)) node.splice(i, 1);
        else strip(node[i], set, seen);
      }
    } else if (node.props) {
      for (const k in node.props) strip(node.props[k], set, seen);
    }
  }

  function patchSheet(sheet) {
    if (!sheet || patched.has(sheet) || typeof sheet.default !== "function") return;
    patched.add(sheet);
    unpatches.push(
      after("default", sheet, (_, tree) => {
        try {
          const set = new Set(ROWS.filter((r) => storage[r]).map((r) => r.toLowerCase()));
          strip(tree, set, new WeakSet());
        } catch (e) {}
        return tree;
      })
    );
  }

  function Settings() {
    vendetta.storage.useProxy(storage);
    return React.createElement(
      ReactNative.ScrollView,
      null,
      React.createElement(
        FormSection,
        { title: "Hide from action sheets" },
        ROWS.map((r) =>
          React.createElement(FormSwitchRow, {
            key: r,
            label: "Hide " + r,
            value: !!storage[r],
            onValueChange: (v) => (storage[r] = v),
          })
        )
      )
    );
  }

  return {
    onLoad() {
      ROWS.forEach((r) => {
        if (storage[r] === undefined) storage[r] = true;
      });
      const Lazy = findByProps("openLazy", "hideActionSheet");
      unpatches.push(before("openLazy", Lazy, ([component]) => component && component.then && component.then(patchSheet)));
    },
    onUnload() {
      unpatches.forEach((u) => u());
      unpatches = [];
    },
    settings: Settings,
  };
})();
