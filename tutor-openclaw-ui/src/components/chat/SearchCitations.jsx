import React, { useState } from 'react';

const SearchCitations = ({ citations = [] }) => {
  const [isOpen, setIsOpen] = useState(true);

  // 如果没有引用数据，则不渲染任何内容
  if (!citations || citations.length === 0) return null;

  return (
    <div className="flex flex-col mb-4 space-y-2 font-sans">
      {/* 头部标题模块：搜索 网络 */}
      <div 
        className="flex items-center text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors w-max"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-2 select-none">搜索 网络</span>
        {/* 箭头，点击旋转 */}
        <svg 
          className={`w-3.5 h-3.5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* 展开的列表内容模块 */}
      {isOpen && (
        <div className="relative pl-4 mt-2">
          {/* 这里是截图里左边那条深蓝色指示线 */}
          <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#1a2b56] rounded-full"></div>
          
          <div className="flex flex-col space-y-3">
            {citations.map((cite, index) => (
              <a 
                key={index}
                href={cite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-sm text-gray-800 hover:opacity-80 transition-opacity"
              >
                {/* 网站图标 Favicon */}
                {cite.icon ? (
                  <img src={cite.icon} alt="favicon" className="w-4 h-4 rounded-sm flex-shrink-0 object-cover" />
                ) : (
                  <div className="w-4 h-4 bg-gray-200 rounded-sm flex-shrink-0 flex items-center justify-center">
                    <span className="text-[10px] text-gray-500">🌐</span>
                  </div>
                )}
                
                {/* 页面标题 */}
                <span className="truncate max-w-[350px] leading-tight flex-grow" title={cite.title}>
                  {cite.title}
                </span>
                
                {/* 域名背景标签块 (灰底灰字圆角) */}
                {cite.domain && (
                  <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded flex-shrink-0">
                    {cite.domain}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCitations;
