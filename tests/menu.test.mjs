import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const menu=JSON.parse(fs.readFileSync(new URL('../src/menu.json',import.meta.url),'utf8'));
test('all source sections and entries are retained',()=>{assert.equal(menu.length,17);assert.equal(menu.flatMap(s=>s.items).length,85)});
test('all menu photo paths exist locally',()=>{for(const d of menu.flatMap(s=>s.items)){if(d.image)assert.ok(fs.existsSync(new URL('../public'+d.image,import.meta.url)),d.name)}});
test('prices and variants remain numeric and the suspicious source price is flagged',()=>{for(const d of menu.flatMap(s=>s.items)){assert.ok(d.price===null||Number.isFinite(d.price));for(const v of d.variants)assert.ok(Number.isFinite(v.price));if(d.price===0)assert.ok(d.review.includes('Confirm zero price'))}});
test('search includes original Amharic names and descriptions',()=>{const dishes=menu.flatMap(s=>s.items);assert.ok(dishes.some(d=>d.name.includes('\u123D\u122E')));assert.ok(dishes.filter(d=>(d.name+' '+d.description).toLowerCase().includes('shiro')).length>0)});
