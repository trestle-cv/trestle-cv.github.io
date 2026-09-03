// Syntax-highlighter regression for the public website (CP22 fix).
//
// The generic highlighter must not treat a URL scheme ("https://", "http://",
// "file://") as a JavaScript comment, while genuine "// comments" and shell
// "# comments" must still receive tok-comment and shell keywords must keep
// tok-keyword. This drives the real highlightCode() from the public asset.
import {readFile} from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(
  new URL("../public/assets/js/script.js", import.meta.url),
  "utf8"
);
const sandbox = {
  document: {querySelector: () => null, querySelectorAll: () => []},
  location: {pathname: "/", href: "http://localhost/"},
  history: {replaceState: () => {}},
  window: {},
  navigator: {},
  URL,
  console,
};
vm.createContext(sandbox);
vm.runInContext(source, sandbox);
const highlight = sandbox.highlightCode;
if (typeof highlight !== "function") {
  console.error("highlightCode was not defined");
  process.exit(1);
}

let failures = 0;
const check = (label, got, want) => {
  const ok = got === want;
  if (!ok) failures += 1;
  console.log(`${ok ? "ok" : "FAIL"} - ${label} (got ${got}, want ${want})`);
};
const has = (kind, s) => highlight(s).includes(`tok-${kind}`);

// 1. Homepage commands: the URL scheme must NOT be a comment.
check("download.sh URL has no tok-comment",
  has("comment", "curl -fsSL https://trestle.cv/download.sh | sh"), false);
check("install.sh URL has no tok-comment",
  has("comment", "curl -fsSL https://trestle.cv/install.sh | sh"), false);
// 2. Other URL schemes.
check("http:// URL has no tok-comment",
  has("comment", "curl -fsSL http://127.0.0.1:7333/ | sh"), false);
check("file:// URL has no tok-comment",
  has("comment", "curl -fsSL file:///tmp/a | sh"), false);
// 3. Real comments still highlight.
check("// comment still receives tok-comment",
  has("comment", "// handle the retry case"), true);
check("# shell comment still receives tok-comment",
  has("comment", "curl -fsSL https://trestle.cv/download.sh | sh # verified"), true);
// 4. Existing shell command highlighting remains intact.
check("shell keyword still receives tok-keyword",
  has("keyword", "curl -fsSL https://trestle.cv/download.sh | sh"), true);
check("GET verb still receives tok-keyword",
  has("keyword", "GET https://trestle.cv/"), true);

if (failures) {
  console.error(`website highlight regression: ${failures} failure(s)`);
  process.exit(1);
}
console.log("website highlight regression passed");
