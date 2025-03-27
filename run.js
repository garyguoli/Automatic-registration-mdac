// 这个文件用于执行index.js中的测试
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runTest() {
  console.log('运行MDAC注册表单自动填写...');
  
  try {
    // 通过命令行执行playwright测试
    execSync('npx playwright test index.js --headed', { 
      stdio: 'inherit',
      cwd: __dirname
    });
    
    console.log('测试完成！');
  } catch (error) {
    console.error('执行过程中出错:', error);
  }
}

runTest(); 