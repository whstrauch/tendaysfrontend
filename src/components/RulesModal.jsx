import React from 'react';
import "./RulesModal.css"

const RulesModal = ({active, exit}) => {
    if (active) {
        return (
            <div className='modal-background' >
                <div className='modal-container'>
                    <div className='flex-row' style={{width: "100%", justifyContent: 'space-between', position: 'sticky', top: "0px", backgroundColor: 'white'}}>
                        <div style={{width: 20, display: 'flex'}}></div>
                        <h2>RULES</h2>
                        <button className="menu" onClick={exit} style={{paddingRight: "5px", cursor: "pointer"}}>
                            <svg viewBox="-15 -15 115 115" width="25" height="25" fill='blue' transform='rotate(45)'>
                                <rect width="10" height="100" rx={8} x={45} fill='black'></rect>
                                <rect width="100" height="10" rx={8} y={45} fill='black'></rect>
                            </svg>
                        </button>
                    </div>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin sagittis felis, non ultrices orci lobortis lacinia. Morbi risus est, semper eu condimentum id, porta vel ipsum. Donec at pharetra ante. Nullam consectetur, sem ut cursus lacinia, lorem sapien tristique quam, in viverra est ligula ultrices lacus. Proin in dapibus neque, ac efficitur felis. Integer lacus tortor, tempor id feugiat ut, consequat pellentesque turpis. Sed congue tempor ullamcorper. Vestibulum ut lacus interdum, mattis ligula lacinia, lobortis diam. Proin fringilla commodo eros vel blandit. Aenean dignissim congue nibh, sed tincidunt urna euismod vitae.

Morbi aliquet luctus placerat. Duis eget justo feugiat, rhoncus purus ac, feugiat mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla urna elit, dapibus at metus id, iaculis porta mi. Proin a nibh ligula. Aliquam erat volutpat. Sed placerat elit in fermentum ultrices. Suspendisse a consectetur dui. Quisque pharetra lacus eu ipsum porttitor, quis placerat sapien mollis. Cras ut odio eu felis venenatis interdum vel ut tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur venenatis non eros vel facilisis. Donec pretium pulvinar fringilla. Proin suscipit turpis sem, in cursus est dictum consectetur. Etiam in venenatis dolor, id ultricies felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed gravida augue. Vestibulum lacinia felis ex, vel porta velit lobortis at. Etiam ipsum eros, fringilla et facilisis in, imperdiet a tellus. Praesent eget vulputate ipsum. Morbi sed nibh quis odio accumsan bibendum laoreet ut ipsum. Pellentesque dictum in elit in sagittis. Cras id velit auctor risus sagittis dignissim.

Donec ultricies convallis auctor. Duis bibendum non nisi in sagittis. Cras laoreet libero lectus, ut vulputate arcu suscipit ut. Proin commodo ultricies mattis. Cras dignissim turpis felis, id ultricies nulla euismod at. In egestas iaculis odio pulvinar rhoncus. Aenean vulputate interdum ullamcorper. Mauris rhoncus lorem ut mi imperdiet viverra. Morbi purus eros, ornare a cursus et, convallis sit amet tellus. Suspendisse in vestibulum lectus. Maecenas tincidunt, lorem eget rhoncus venenatis, quam lacus congue purus, quis vehicula velit elit in ante. In hac habitasse platea dictumst.

Aliquam mattis sodales pellentesque. Duis pulvinar, turpis vitae dignissim volutpat, metus urna tempus eros, ac suscipit lectus augue eu orci. Vivamus porta, sapien sed feugiat vehicula, lectus augue tristique velit, ac lobortis turpis dui at felis. Morbi nec ex est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce ac odio leo.

Vivamus non quam rutrum, commodo augue in, convallis turpis. Nunc sit amet est ultrices, vehicula lorem volutpat, egestas arcu. Duis massa sem, aliquet a est sed, vulputate consectetur risus. Etiam quis mauris a magna tincidunt vestibulum. Curabitur sed ex enim. Fusce ante diam, pharetra ac pharetra eget, iaculis id tortor. Vestibulum commodo lacus ut purus fringilla dignissim. Vivamus mattis luctus ligula.

Ut ornare leo magna, sit amet semper erat pretium non. Aenean accumsan turpis tortor, id dictum est cursus id. In hac habitasse platea dictumst. Nulla facilisi. Aenean eleifend diam vel lectus facilisis, vitae finibus urna vestibulum. Duis facilisis mauris eu faucibus facilisis. Duis ornare facilisis nibh, nec rhoncus nulla tempor vitae. Quisque semper euismod neque, et luctus massa sodales sed. Quisque viverra malesuada ex eget pharetra. Donec varius enim at massa molestie, at gravida felis rhoncus. Pellentesque eget massa venenatis, volutpat ipsum sed, vehicula augue. Morbi non justo eget arcu convallis volutpat. Aliquam accumsan nunc id nunc luctus, vitae congue lectus eleifend.

Donec a sapien ac turpis vehicula placerat. Duis a orci ullamcorper magna lobortis gravida. Curabitur aliquet sit amet nulla a placerat. Phasellus auctor auctor quam, ut venenatis purus elementum sed. In dapibus euismod ullamcorper. Aenean dignissim scelerisque ante porta porttitor. Suspendisse et viverra ligula, et efficitur lorem. Sed tincidunt vel urna ut interdum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras egestas libero nec suscipit hendrerit. Pellentesque volutpat non sem ac tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus.

Praesent at eros pretium, interdum leo laoreet, cursus enim. Maecenas velit ex, tempus id maximus et, mollis ac purus. Pellentesque in placerat elit. Curabitur laoreet lobortis nisl at sagittis. Vestibulum nec dignissim diam, id maximus neque. Pellentesque ultricies leo tellus, in vestibulum sem varius sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sodales odio id lectus semper, aliquam dignissim lorem luctus. Donec fermentum ac nibh quis porttitor. Quisque urna ex, placerat sit amet vulputate sed, vestibulum sit amet ante. Ut aliquam sodales ornare. Phasellus justo mi, ultricies quis libero quis, aliquet fermentum augue. In sed nulla dapibus, feugiat neque consectetur, eleifend odio. Nullam tristique ipsum at dolor bibendum eleifend. Duis scelerisque pulvinar justo, quis congue ipsum fermentum facilisis.

Aliquam egestas non mi id faucibus. Nunc sed sem porttitor, tincidunt sapien sit amet, dictum odio. Cras risus ipsum, scelerisque non arcu sed, consequat viverra felis. Sed interdum luctus mauris vitae accumsan. Praesent mollis ligula justo, a consequat risus dapibus eget. Donec lacinia semper consectetur. Etiam vitae libero ut magna convallis molestie porttitor quis quam. Duis sed scelerisque mi. Suspendisse fringilla dolor non ante mattis, non ornare odio viverra. Sed quis mi odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed elementum, enim eu viverra pellentesque, elit diam scelerisque nunc, quis blandit leo nulla vitae nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent tempor augue at neque auctor, id accumsan tellus aliquam.
                    </p>

                </div>
            </div>
        );
    }
    
};

export default RulesModal;

