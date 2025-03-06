export function btoa2(s) {
  return window.btoa(unescape(encodeURIComponent(s)));
}

export function atob2(s) {
  try {
    s = s.replace(/ /g, '+');
    const r = decodeURIComponent(escape(window.atob(s)));
    return r;
  } catch (e) {
    console.error(e, { s });
    throw e;
  }
}


// convert a UTF-8 string to a string in which
// each 16-bit unit occupies only one byte
function toBinary(s: string) {
  const bytes = new TextEncoder().encode(s);
  return btoa(String.fromCharCode(...bytes));
}

function fromBinary(s: string): string {
  const bytes = Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

// our previous Base64-encoded string
let decoded = fromBinary(encoded) // "✓ à la mode"
